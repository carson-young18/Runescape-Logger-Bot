import levenshtein from 'fast-levenshtein';
import { readFile } from 'fs/promises';

const items = JSON.parse(
  await readFile(new URL('../data/items.json', import.meta.url), 'utf-8')
);

export default async function findItem(itemName) {

  let item = {
    name: itemName,
    tradeable: null,
    id: null
  };

  for(const i of items){
      try{
        if(i.name.toLowerCase() == item.name.toLowerCase()){
          if (i.is_on_ge){
            item.name = i.name;
            item.tradeable = true;
            item.id = i.id;
            break;
          }
          else{
            item.name = i.name;
            item.tradeable = false;
            item.id = i.id;
          }
        }
      }
      catch{
        continue;
      }
    }

  if (item.id === null) {
    let bestMatch = null;
    let bestDistance = Infinity;

    for (const item of items) {
      const distance = levenshtein.get(
        input.toLowerCase(),
        item.name.toLowerCase()
      );

      if (distance < bestDistance) {
        bestDistance = distance;
        bestMatch = item;
      }
    }

    if (bestDistance <= 2){
      item.name = bestMatch.name;
      item.tradeable = bestMatch.is_on_ge ? true : false;
      item.id = bestMatch.id;
    }
  }

  return item;
}