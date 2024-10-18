import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
import axios from 'axios';
import { load } from 'cheerio';
import { DataGroup } from '@/types/data';
import animalNames from '@/data/animalNames';

dotenv.config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.KEY_FILE as string),
});

const bucketName = 'bgm-mahjong-data';

async function parser(): Promise<string[]> {
  try {
    // web URL
    const url = process.env.WEB_URL;
    if (!url) throw new Error('WEB_URL is not defined in .env');

    const response = await axios.get(url, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
    const html = response.data;

    // parsing html
    console.log('Parsing data...');
    const $ = load(html);
    const data = $(process.env.DATA_POS || '');
    const text_data: string[] = [];
    data.each((i, elem) => {
      text_data.push($(elem).text());
    });

    return text_data;
  } catch (err) {
    console.error('Error during parsing:', err);
    return [];
  }
}

function dataProcess(data: string[]) {
  const data_group: DataGroup[] = [];
  const keys: Array<keyof DataGroup> = [
    'timestamp',
    'firstPlaceName',
    'firstPlaceScore',
    'secondPlaceName',
    'secondPlaceScore',
    'thirdPlaceName',
    'thirdPlaceScore',
    'fourthPlaceName',
    'fourthPlaceScore',
    'checksum',
    'comment',
  ];

  for (let i = 2 * keys.length; i < data.length; i += keys.length) {
    const group: Partial<DataGroup> = {};

    // check end of data
    if (data[i] == '') {
      break;
    }

    for (let j = 0; j < keys.length; j++) {
      if (j == 0) {
        // date parsing
        const dateString = data[i + j];
        const isPM = dateString.includes('오후');
        const cleanedDateString = dateString
          .replace('오전', '')
          .replace('오후', '')
          .trim()
          .replace(/\s+/g, ' ');
        const [year, month, day, timePart] = cleanedDateString.split(' ');
        const cleanedYear = parseInt(year.replace('.', ''));
        const cleanedMonth = parseInt(month.replace('.', ''));
        const cleanedDay = parseInt(day.replace('.', ''));
        const [, minute, second] = timePart
          .split(':')
          .map((num) => parseInt(num, 10));

        let hour = parseInt(timePart.split(':')[0], 10);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;

        const isoString = `${cleanedYear}-${String(cleanedMonth).padStart(2, '0')}-${String(cleanedDay).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}+09:00`;

        (group[keys[j]] as Date) = new Date(isoString);
      } else if (j == 2 || j == 4 || j == 6 || j == 8 || j == 9) {
        (group[keys[j]] as number) = parseInt(data[i + j], 10);
      } else {
        (group[keys[j]] as string) = data[i + j];
      }
    }

    data_group.push(group as DataGroup);
  }
  return data_group;
}

let mappingCache: Record<string, string> | null = null;

async function loadMapping(): Promise<Record<string, string>> {
  if (mappingCache) return mappingCache;

  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file('name_mapping.json');
    const [contents] = await file.download();
    mappingCache = JSON.parse(contents.toString());
    if (!mappingCache) {
      throw new Error('Error while loading name mapping data');
    }
    return mappingCache;
  } catch (err) {
    console.error(err);
    mappingCache = {};
    return mappingCache;
  }
}

async function saveMapping(mapping: Record<string, string>) {
  mappingCache = mapping;
  await storage
    .bucket(bucketName)
    .file('name_mapping.json')
    .save(JSON.stringify(mapping, null, 2), {
      contentType: 'application/json',
    });
}

async function findAvailableAnimal(usedAnimals: Set<string>) {
  return animalNames.find((animal: string) => !usedAnimals.has(animal));
}

async function getRandomAnimal(originalName: string): Promise<string> {
  const mappingData = await loadMapping();
  const usedAnimals: Set<string> = new Set(Object.values(mappingData));

  if (mappingData[originalName]) {
    return mappingData[originalName];
  }

  const availableAnimal = await findAvailableAnimal(usedAnimals);
  if (!availableAnimal) {
    console.error('No more animal names available!');
    const tempName = 'Temp_' + (mappingData.length + 1).toString();
    mappingData[originalName] = tempName;
    await saveMapping(mappingData);
    return tempName;
  } else {
    mappingData[originalName] = availableAnimal;
    await saveMapping(mappingData);
    return availableAnimal;
  }
}

async function animalizeComment(data: DataGroup): Promise<string> {
  const firstPlaceName = await getRandomAnimal(data.firstPlaceName);
  const secondPlaceName = await getRandomAnimal(data.secondPlaceName);
  const thirdPlaceName = await getRandomAnimal(data.thirdPlaceName);
  const fourthPlaceName = await getRandomAnimal(data.fourthPlaceName);

  if (!data.comment) {
    return '';
  }
  return data.comment
    .replaceAll(data.firstPlaceName, firstPlaceName)
    .replaceAll(data.secondPlaceName, secondPlaceName)
    .replaceAll(data.thirdPlaceName, thirdPlaceName)
    .replaceAll(data.fourthPlaceName, fourthPlaceName);
}

async function animalizeName(data_group: DataGroup[]): Promise<DataGroup[]> {
  return Promise.all(
    data_group.map(async (data) => ({
      ...data,
      firstPlaceName: await getRandomAnimal(data.firstPlaceName),
      secondPlaceName: await getRandomAnimal(data.secondPlaceName),
      thirdPlaceName: await getRandomAnimal(data.thirdPlaceName),
      fourthPlaceName: await getRandomAnimal(data.fourthPlaceName),
      comment: await animalizeComment(data),
    }))
  );
}

async function saveToJson(data_group: DataGroup[]): Promise<void> {
  try {
    const data_json = JSON.stringify(data_group, null, 2);
    await storage.bucket(bucketName).file('game_log.json').save(data_json, {
      contentType: 'application/json',
    });
    console.log('Successfully wrote file');
  } catch (err) {
    console.error('Error writing file', err);
  }
}

export async function GET() {
  try {
    const data = await parser();

    if (data.length === 0) {
      console.error('No data to process');
      return;
    } else {
      console.log('Successfully parsed data');
    }

    const data_group = dataProcess(data);
    const annonymous_data = await animalizeName(data_group);
    await saveToJson(annonymous_data);
    const response = NextResponse.json({ data: annonymous_data });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to fetch and parse data: ${err}` },
      { status: 500 }
    );
  }
}
