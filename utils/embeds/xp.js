import { EmbedBuilder } from "discord.js";
import fetchAndResize from "../resize.js";

export default async function xp(activity, totalXp) {
  let [skillXp, skill] = activity.text.split("XP in ");
  skillXp = skillXp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  totalXp = totalXp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let attachment;
  try{
    attachment = await fetchAndResize(`https://runescape.wiki/images/${skill}.png`);
  }
  catch{
    attachment = await fetchAndResize(`https://runescape.wiki/images/Statistics.png?72ca5`);
  }

  const embed = new EmbedBuilder();

  embed
    .setTitle(`${activity.player} has reached ${skillXp} XP in ${skill}`)
    .setColor('#49F273')
    .setDescription(`Total XP: ${totalXp}`)
    .setThumbnail(`attachment://icon.png`)
    .setTimestamp(new Date(activity.date))
  
  return {embeds: [embed], files: [attachment]};
}