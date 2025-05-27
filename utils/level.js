import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import fetchAndResize from "../resize.js";

export default async function level(activity, totalLevel) {
  const level = parseInt(activity.details.split("level ")[1]);
  const skill = activity.text.split("Levelled up ")[1].replace(".", "");

  let attachment;
  try{
    attachment = await fetchAndResize(`https://runescape.wiki/images/${skill}.png`);
  }
  catch{
    console.log(questName, questURL);
    attachment = await fetchAndResize(`https://runescape.wiki/images/Statistics.png?72ca5`);
  }

  const embed = new EmbedBuilder();

  embed
    .setTitle(`${activity.player} has levelled ${skill} to ${level}`)
    .setColor('#49F273')
    .setDescription(`Total Level: ${totalLevel}`)
    .setThumbnail(`attachment://icon.png`)
    .setTimestamp(new Date(activity.date))
  
  return {embeds: [embed], files: [attachment]};
};