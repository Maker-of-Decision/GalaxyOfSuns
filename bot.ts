import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';

dotenv.config();

// Use environment variables
const username = process.env.BLUESKY_USERNAME;
const password = process.env.BLUESKY_PASSWORD;

if (!username || !password) {
  console.error("Missing environment variables: BLUESKY_USERNAME or BLUESKY_PASSWORD");
  process.exit(1);
}

console.log("BLUESKY_USERNAME:", process.env.BLUESKY_USERNAME);
console.log("BLUESKY_PASSWORD:", process.env.BLUESKY_PASSWORD ? "Password is set" : "Password is missing");

const agent = new BskyAgent({
  service: 'https://bsky.social',
});

async function main() {
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!,
  });

 console.log(`Logging in as ${process.env.BLUESKY_USERNAME}`); // Corrected logging

  await agent.post({
    text: 'Testing the Galaxy of Suns',
  });
  console.log('Just posted!');
}

const job = new CronJob('0 */3 * * *', main);
job.start();

export default async function handler(req: any, res: any) {
  res.status(200).send('Bot is running');
}

// Optionally, start the bot here if required
(async () => {
  console.log('Starting bot...');
  await main(); // Call your bot logic function
})();