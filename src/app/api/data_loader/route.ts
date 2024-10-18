import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.KEY_FILE as string),
});

const bucketName = 'bgm-mahjong-data';
const fileName = 'game_log.json';

export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    console.log('Loading data...');
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    const [contents] = await file.download();
    const data = JSON.parse(contents.toString());
    console.log('Successfully loaded data');
    const response = NextResponse.json({ data: data });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (err) {
    console.error('Error during loading data:', err);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
