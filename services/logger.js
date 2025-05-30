import getProfiles from '../utils/profiles.js';
import processData from '../utils/process.js';
import sendEmbeds from '../utils/embeds.js';

export default async function logger(client) {
  console.log('Logging activities...');
  const start = Date.now();

  const playerData = await getProfiles();
  const newActivities = await processData(playerData);
  await sendEmbeds(newActivities, playerData, client);

  const time = Date.now() - start;
  console.log(`New Activities: ${newActivities.length} | Time: ${time}ms`);
};
