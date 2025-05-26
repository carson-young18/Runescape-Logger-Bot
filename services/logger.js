import fetch from 'node-fetch';
import getProfiles from '../utils/profiles.js';
import processData from '../utils/process.js';

export default async function logger(client) {
  console.log('Fetching player profiles...');
  const playerData = await getProfiles();

  const newActivities = await processData(playerData);
};
