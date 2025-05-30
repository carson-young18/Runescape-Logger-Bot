import * as embeds from './embeds/index.js'
import pet from './embeds/pet.js';
import skips from './skip-drops.js';

export default async function sendEmbeds(activities, playerData, client) {
  const logChannel = client.channels.cache.get('934688054818517093');

  for(const activity of activities){
    let embed;

    if(activity.type == "quest"){
      const playerQuests = playerData.find(p => p.player === activity.player).quests;
      embed = await embeds.quests(activity, playerQuests);
    }
    else if(activity.type == "level"){
      const skillLevel = parseInt(activity.details.split("level ")[1]);
      if (skillLevel % 10 == 0 || skillLevel == 99){
        const totalLevel = playerData.find(p => p.player === activity.player).profile.totalskill;
        embed = await embeds.level(activity, totalLevel);
      }
      else{
        continue;
      }
    }
    else if(activity.type == "drop"){
      let skip = false;
      for(const s of skips){
        if (activity.text.includes(s)){
          skip = true;
        }
      }
      if(skip){
        continue;
      }
      embed = await embeds.drops(activity);
    }
    else if(activity.type == 'xp'){
      const skillXp = parseInt(activity.text.split("XP")[0]);
      if(skillXp % 10000000 == 0){
        const totalXp = playerData.find(p => p.player === activity.player).profile.totalxp;
        embed = await embeds.xp(activity, totalXp);
      }
      else{
        continue;
      }
    }
    else if(activity.type == 'pet'){
      const skillsData = playerData.find(p => p.player === activity.player).profile.skillvalues;
      embed = await pet(activity, skillsData);
    }
    else{
      continue;
    }

    logChannel.send(embed);
  }
};