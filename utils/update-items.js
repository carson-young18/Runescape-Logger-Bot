import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

const url = 'https://chisel.weirdgloop.org/gazproj/cache/items.json';
const path = new URL('../data/items.json', import.meta.url);

export default async function updateItems() {
  try {
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`${response.status}`);
    } 
    
    const json = await response.text();
    await writeFile(path, json, 'utf8');
    console.log(`items.json updated successfully.`);
  } 
  catch (err) {
    console.error(`Failed to update items.json:`);
  }
};