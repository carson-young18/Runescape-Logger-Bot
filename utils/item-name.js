export default async function parseItem(text) {
  let name = "";

  if (text.includes("I found a pair of")){
    name = text.split("I found a pair of ")[1];
  }
  else if (text.includes("I found some")){
    name = text.split("I found some ")[1];
  }
  else if (text.includes("I found an ")){
    name = text.split("I found an ")[1];
  }
  else if (text.includes("I found a ")){
    name = text.split("I found a ")[1];
  }
  else{
    console.log(`Could not parse name for: ${text}`);
    return 'null';
  }

  name.replaceAll(".", "");



  return name;
};