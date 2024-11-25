import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';

dotenv.config();

const agent = new BskyAgent({
  service: 'https://bsky.social',
});

async function main() {
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });
  await agent.post({
    text: '🙂',
  });
  console.log('Just posted!');
}

const job = new CronJob('0 */3 * * *', main);
job.start();