import cron from 'node-cron';
import logger from '../services/logger.js';

export default (client) => {
  console.log(`Logged in as ${client.user.tag}`);

  logger(client);
  cron.schedule('* * * * *', async () => {
    try{
      console.log('Logging new activities...');
      await logger(client);
    }
    catch (error){
      console.log(`Error: ${error}`);
    }
  });

  cron.schedule('0 0 * * *', async () => {
    try{
      console.log('Updating cached data...');
    }
    catch (error){
      console.log(`Error: ${error}`);
    }
  },
  {
    timezone: 'UTC'
  });
};

