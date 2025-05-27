import { EmbedBuilder } from "discord.js";
import fetchAndResize from "../resize.js";
import parseItem from "./item-name.js";
import { readFile } from 'fs/promises';
const items = JSON.parse(
  await readFile(new URL('../data/items.json', import.meta.url), 'utf-8')
);

export default async function drops(activity) {
  let item = {};

  item.name = await parseItem(activity.text);

  for(const i of items){
    try{
      if(i.name.toLowerCase() == item.name.toLowerCase()){
        if (i['is_on_ge']){
          item.tradeable = true;
          item.id = i.id;
          break;
        }
        else{
          item.tradeable = false;
          item.id = i.id;
        }
      }
    }
    catch{
      continue;
    }
  }

  if (item.tradeable){
    const priceSearch = await fetch(`https://secure.runescape.com/m=itemdb_rs/api/graph/${item.id}.json`);
    const prices = await priceSearch.json();
    const price = prices.daily[Object.keys(prices.daily).sort().pop()];
    item.price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' GP'
  }
  else{
    console.log(`${item.name} : ${item.id}`)
    item.price = `Untradeable`;
  }

  let attachment;
  try{
    attachment = await fetchAndResize(`https://services.runescape.com/m=itemdb_rs/obj_sprite.gif?id=${item.id}`);
  }
  catch{
    console.log(item.name, item.id);
    attachment = await fetchAndResize(`https://runescape.wiki/images/Golden_loot_beam_1.png?11278`);
  }

  const embed = new EmbedBuilder();

  embed
    .setTitle(`${activity.text.replace("I", activity.player)}`)
    .setColor('#D9B234')
    .setDescription(`Price : ${item.price}`)
    .setThumbnail(`attachment://icon.png`)
    .setTimestamp(new Date(activity.date))

  return {embeds: [embed], files: [attachment]};
};