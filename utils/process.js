import db from './db.js';

export default async function processData(playerData) {
  for(const data of playerData){
    for(const activity of data.profile.activities){
      console.log(activity.text.replace("I ", data.player));
    }
  }

  return 0;
};