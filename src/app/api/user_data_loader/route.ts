import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.KEY_FILE as string),
});

const bucketName = 'bgm-mahjong-data';
const fileName = 'user_data_log.json';

export async function GET() {
  try {
    console.log('Loading user data...');
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    const [contents] = await file.download();
    const data = JSON.parse(contents.toString());
    console.log('Successfully loaded user data');
    const response = NextResponse.json(data);
    return response;
  } catch (err) {
    console.error('Error during loading user data:', err);
    return NextResponse.json(
      { error: 'Failed to load user data' },
      { status: 500 }
    );
  }
}
