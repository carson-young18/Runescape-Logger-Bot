import db from './db.js';
import utcDate from './utc.js';
import activityType from './type.js';

export default async function processData(playerData) {
  let newActs = 0;
  let newActivities = [];

  for(const data of playerData){
    for(const activity of data.profile.activities){
      activity.date = utcDate(activity.date);

      const q = db.prepare('SELECT * FROM activity_logs WHERE player=? AND date=? AND details=?');
      const existing = q.get(data.player, activity.date, activity.details);

      if(existing){
        continue;
      }

      activity.type = activityType(activity.text);
      activity.player = data.player;

      db.prepare('INSERT INTO activity_logs (player, date, details, text, type) VALUES (?, ?, ?, ?, ?)')
        .run(data.player, activity.date, activity.details, activity.text, activity.type);

      newActivities.push(activity);
      newActs++;
    }
  }

  console.log(`New activities logged: ${newActs}`);
  return newActivities;
};