import { EmbedBuilder } from "discord.js";
import fetchAndResize from "../resize.js";
import { readFile } from 'fs/promises';
const items = JSON.parse(
  await readFile(new URL('../../data/items.json', import.meta.url), 'utf-8')
);
const skills = JSON.parse(
  await readFile(new URL('../../data/skill-ids.json', import.meta.url), 'utf-8')
);

export default async function pet(activity, skillsData) {
  let pet = {};

  pet.name = activity.text.split(",")[0].split("found ")[1];
  pet.skill = activity.text.split(" the ")[1].replace(" pet.", "");

  for(const s of skills){
    if(s.name == pet.skill){
      pet.skillID = s.id;
    }
  }

  for(const i of items){
    try{
      if(i.name.toLowerCase() == pet.name.toLowerCase()){
        console.log()
        if (i.extra.is_skill_pet == 1){
          pet.id = i.id;
          break;
        }
      }
    }
    catch{
      continue;
    }
  }

  for(const s of skillsData){
    if(s.id == pet.skillID){
      pet.xp = (s.xp / 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  let attachment;
  try{
    attachment = await fetchAndResize(`https://services.runescape.com/m=itemdb_rs/obj_sprite.gif?id=${pet.id}`);
  }
  catch{
    attachment = await fetchAndResize(`https://runescape.wiki/images/Golden_loot_beam_1.png?11278`);
  }

  const embed = new EmbedBuilder();

  embed
    .setTitle(`${activity.text.replace("I", activity.player)}`)
    .setColor('#D9B234')
    .setDescription(`${pet.skill} XP: ${pet.xp}`)
    .setThumbnail(`attachment://icon.png`)
    .setTimestamp(new Date(activity.date))

  return {embeds: [embed], files: [attachment]};
};