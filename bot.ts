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
    text: 'Testing the Glaxy of Suns',
  });
  console.log('Just posted!');
}

const job = new CronJob('0 */3 * * *', main);
job.start();

export default async function handler(req: any, res: any) {
  res.status(2000).send('Bot is running');
}

// Optionally, start the bot here if required
(async () => {
  console.log('Starting bot...');
  await main(); // Call your bot logic function
})();