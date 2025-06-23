import getProfiles from '../utils/profiles.js';
import processData from '../utils/process.js';
import sendEmbeds from '../utils/embeds.js';

export default async function logger(client) {
  const start = Date.now();

  const playerData = await getProfiles();
  const newActivities = await processData(playerData);
  await sendEmbeds(newActivities, playerData, client);

  const time = Date.now() - start;
};
