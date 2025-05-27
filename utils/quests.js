import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import fetchAndResize from "../resize.js";

export default async function quests(activity, playerQuests) {  
  let playerQP = 0;
  for(const quest of playerQuests.quests){
    if(quest.status == 'COMPLETED'){
      playerQP += quest.questPoints;
    }
  }
  
  const questName = activity.text.split("Quest complete: ")[1];
  const questURL = encodeURIComponent(questName.replaceAll(" ", "_"));

  let attachment;
  try{
    attachment = await fetchAndResize(`https://runescape.wiki/images/${questURL}_icon.png`);
  }
  catch{
    console.log(questName, questURL);
    attachment = await fetchAndResize(`https://runescape.wiki/images/Quest_points.png?4350d`);
  }

  const embed = new EmbedBuilder();

  embed
    .setColor('#6596EB')
    .setTitle(`${activity.player} has completed: ${questName}`)
    .setDescription(`Total quest points: ${playerQP}`)
    .setThumbnail('attachment://icon.png')
    .setTimestamp(new Date(activity.date))

  return {embeds: [embed], files: [attachment]};
}