import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    console.log('Loading data...');
    const filePath = path.join(process.cwd(), './src/data/game_log.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    console.log('Successfully loaded data');
    return NextResponse.json({ data: data });
  } catch (err) {
    console.error('Error during loading data:', err);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
