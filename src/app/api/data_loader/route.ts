import { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.KEY_FILE as string),
});

const bucketName = 'bgm-mahjong-data';
const fileName = 'game_log.json';

export const fetchCache = 'force-no-store';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Loading data...');
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    const [contents] = await file.download();
    const data = JSON.parse(contents.toString());
    console.log('Successfully loaded data');
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error during loading data:', err);
    return res.status(500).json({ error: 'Failed to load data' });
  }
}
