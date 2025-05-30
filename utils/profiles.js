import players from './players.js';
import fetch from 'node-fetch';
import db from './db.js';

export default async function getProfiles () {
  const start = Date.now();

  let profilesReceived = 0;
  let profileErrors = 0;

  const fetches = players.map(async (player) => {
    const playerURL = encodeURIComponent(player);

    const profileURL = `https://apps.runescape.com/runemetrics/profile/profile?user=${playerURL}&activities=20`;
    const questURL = `https://apps.runescape.com/runemetrics/quests?user=${playerURL}`;
    
    try{
      const [profile, quest] = await Promise.all([
        fetch(profileURL),
        fetch(questURL)
      ]);

      if(!profile.ok) throw new Error(`Profile fetch failed: ${player}`);
      if(!quest.ok) throw new Error(`Quests fetch failed: ${player}`);
      
      const profileData = await profile.json();
      const questData = await quest.json();

      profilesReceived++;
      return {player, profile: profileData, quests: questData};
    }
    catch(error){
      profileErrors++;
      return {player, profile: null, quests: null};
    }
  });

  const results = await Promise.all(fetches);

  const duration = ((Date.now() - start) / 1000).toFixed(2);

  db.prepare(`
    INSERT INTO profile_fetches (response_time_s, profiles_received, profile_errors)
    VALUES (?, ?, ?)
  `).run(duration, profilesReceived, profileErrors);

  return results;
};