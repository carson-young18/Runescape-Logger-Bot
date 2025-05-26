import db from './db.js';

export default async function processData(playerData) {
  for(const data of playerData){
    for(const activity of data.profile.activities){
      //YOU WERE HERE!
    }
  }

  return 0;
};