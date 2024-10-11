import { NextResponse } from 'next/server';
import dotenv from "dotenv";
import axios from "axios";
import { load } from "cheerio";
import fs from "fs/promises";
import { DataGroup } from '@/types/data';

dotenv.config();

async function parser(): Promise<string[]> {
  try {
    // web URL
    const url = process.env.WEB_URL;
    if (!url) throw new Error("WEB_URL is not defined in .env");

    const response = await axios.get(url);
    const html = response.data;

    // parsing html
    console.log("Parsing data...")
    const $ = load(html);
    const data = $(process.env.DATA_POS || "");
    const text_data: string[] = [];
    data.each((i, elem) => {
      text_data.push($(elem).text());
    });

    return text_data;
  } catch (err) {
    console.error("Error during parsing:", err);
    return [];
  }
}

function dataProcess(data: string[]) {
  const data_group: DataGroup[] = [];
  const keys: Array<keyof DataGroup> = [
    "timestamp",
    "first_place_name",
    "first_place_score",
    "second_place_name",
    "second_place_score",
    "third_place_name",
    "third_place_score",
    "fourth_place_name",
    "fourth_place_score",
    "checksum",
    "comment",
  ];

  for (let i = 2 * keys.length; i < data.length; i += keys.length) {
    const group: Partial<DataGroup> = {};

    // check end of data
    if (data[i] == "") {
      break;
    }

    for (let j = 0; j < keys.length; j++) {
      group[keys[j]] = data[i + j];
    }

    data_group.push(group as DataGroup);
  }
  return data_group;
}

async function saveToJson(data_group: DataGroup[]): Promise<void> {
  try {
    const data_json = JSON.stringify(data_group, null, 2);
    await fs.writeFile("./data.json", data_json);
    console.log("Successfully wrote file");
  } catch (err) {
    console.error("Error writing file", err);
  }
}

export async function GET() {
  try {
    const data = await parser();
  
    if (data.length === 0) {
      console.error("No data to process");
      return;
    }
    else {
      console.log("Successfully parsed data")
    }
  
    const data_group = dataProcess(data);
    await saveToJson(data_group);


    return NextResponse.json({ data: data_group });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch and parse data' }, { status: 500 });
  }
  
}
