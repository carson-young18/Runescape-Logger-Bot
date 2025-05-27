import players from './players.js';
import fetch from 'node-fetch';

export default async function getProfiles () {
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

      return {player, profile: profileData, quests: questData};
    }
    catch(error){
      console.error(`Failed to fetch ${player}: ${error.message}`);
      return {player, profile: null, quests: null};
    }
  });

  const results = await Promise.all(fetches);
  return results;
};