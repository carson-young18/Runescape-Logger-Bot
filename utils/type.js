export default function activityType(text) {
  let type = "";
  if(text.includes('Levelled up')){
    type = 'level';
  }
  else if(text.includes('Quest complete')){
    type = 'quest';
  }
  else if(text.includes(' pet.')){
    type = 'pet';
  }
  else if(text.includes('I found')){
    type = 'drop';
  }
  else if(text.includes('XP')){
    type = 'xp';
  }
  else{
    type = 'misc';
  }

  return type;
};