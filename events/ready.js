import cron from 'node-cron';
import logger from '../services/logger.js';
import updateItems from '../utils/update-items.js';

export default (client) => {
  console.log(`Logged in as ${client.user.tag}`);

  logger(client);

  cron.schedule('* * * * *', async () => {
    try{
      await logger(client);
    }
    catch (error){
      console.log(`Error: ${error}`);
    }
  });

  cron.schedule('0 5 * * *', async () => {
    try{
      await updateItems();
    }
    catch (error){
      console.log(`Error: ${error}`);
    }
  },
  {
    timezone: 'UTC'
  });
};

