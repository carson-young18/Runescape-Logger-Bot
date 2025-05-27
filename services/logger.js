import fetch from 'node-fetch';
import getProfiles from '../utils/profiles.js';
import processData from '../utils/process.js';
import sendEmbeds from '../utils/embeds.js';

export default async function logger(client) {
  console.log('Fetching player profiles...');
  const playerData = await getProfiles();

  console.log('Processing data...');
  const newActivities = await processData(playerData);

  console.log('Sending embeds...');
  await sendEmbeds(newActivities, playerData, client);
  console.log('Done.')
};
