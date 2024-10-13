import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs/promises';
import { DataGroup } from '@/types/data';
import animalNames from '@/data/animalNames';

dotenv.config();

async function parser(): Promise<string[]> {
  try {
    // web URL
    const url = process.env.WEB_URL;
    if (!url) throw new Error('WEB_URL is not defined in .env');

    const response = await axios.get(url);
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
    'first_place_name',
    'first_place_score',
    'second_place_name',
    'second_place_score',
    'third_place_name',
    'third_place_score',
    'fourth_place_name',
    'fourth_place_score',
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
        let [hour, minute, second] = timePart
          .split(':')
          .map((num) => parseInt(num, 10));

        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;

        group[keys[j]] = new Date(
          cleanedYear,
          cleanedMonth - 1,
          cleanedDay,
          hour,
          minute,
          second
        );
      } else if (j == 2 || j == 4 || j == 6 || j == 8 || j == 9) {
        group[keys[j]] = parseInt(data[i + j], 10);
      } else {
        group[keys[j]] = data[i + j];
      }
    }

    data_group.push(group as DataGroup);
  }
  return data_group;
}

let mappingCache: Record<string, string> | null = null;

async function loadMapping() {
  if (mappingCache) return mappingCache;

  try {
    const data = await fs.readFile('./src/data/name_mapping.json', 'utf-8');
    mappingCache = JSON.parse(data);
    return mappingCache;
  } catch (error) {
    mappingCache = {};
    return mappingCache;
  }
}

async function saveMapping(mapping: Record<string, string>) {
  mappingCache = mapping;
  await fs.writeFile(
    './src/data/name_mapping.json',
    JSON.stringify(mapping, null, 2)
  );
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
  }
  mappingData[originalName] = availableAnimal;
  await saveMapping(mappingData);
  return availableAnimal;
}

async function animalizeComment(data: DataGroup): Promise<string> {
  const firstPlaceName = await getRandomAnimal(data.first_place_name);
  const secondPlaceName = await getRandomAnimal(data.second_place_name);
  const thirdPlaceName = await getRandomAnimal(data.third_place_name);
  const fourthPlaceName = await getRandomAnimal(data.fourth_place_name);

  if (!data.comment) {
    return '';
  }
  return data.comment
    .replaceAll(data.first_place_name, firstPlaceName)
    .replaceAll(data.second_place_name, secondPlaceName)
    .replaceAll(data.third_place_name, thirdPlaceName)
    .replaceAll(data.fourth_place_name, fourthPlaceName);
}

async function animalizeName(data_group: DataGroup[]): Promise<DataGroup[]> {
  return Promise.all(
    data_group.map(async (data) => ({
      ...data,
      first_place_name: await getRandomAnimal(data.first_place_name),
      second_place_name: await getRandomAnimal(data.second_place_name),
      third_place_name: await getRandomAnimal(data.third_place_name),
      fourth_place_name: await getRandomAnimal(data.fourth_place_name),
      comment: await animalizeComment(data),
    }))
  );
}

async function saveToJson(data_group: DataGroup[]): Promise<void> {
  try {
    const data_json = JSON.stringify(data_group, null, 2);
    await fs.writeFile('./src/data/game_log.json', data_json);
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

    return NextResponse.json({ data: annonymous_data });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch and parse data' },
      { status: 500 }
    );
  }
}
