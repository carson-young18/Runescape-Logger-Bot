import fetch from 'node-fetch';
import getProfiles from '../utils/profiles.js';

export default async function logger(client) {
  console.log('Fetching player profiles...');
  const playerData = await getProfiles();

  
};
