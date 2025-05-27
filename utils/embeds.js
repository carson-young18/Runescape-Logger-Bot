import quests from "./quests.js";
import level from "./level.js";
import drops from "./drops.js";

export default async function sendEmbeds(activities, playerData, client) {
  const logChannel = client.channels.cache.get('934688054818517093');

  for(const activity of activities){
    let embed;

    if(activity.type == "quest"){
      const playerQuests = playerData.find(p => p.player === activity.player).quests;
      embed = await quests(activity, playerQuests);
    }
    else if(activity.type == "level"){
      const skillLevel = parseInt(activity.details.split("level ")[1]);
      if (skillLevel % 10 == 0 || skillLevel == 99){
        const totalLevel = playerData.find(p => p.player === activity.player).profile.totalskill;
        embed = await level(activity, totalLevel);
      }
      else{
        continue;
      }
    }
    else if(activity.type == "drop"){
      if (activity.text.includes("I found a book: ") || activity.text.includes("ancient effigy")){
        continue;
      }
      embed = await drops(activity);
    }
    else{
      continue;
    }

    logChannel.send(embed);
  }
};