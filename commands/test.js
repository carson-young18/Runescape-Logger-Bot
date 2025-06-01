import drops from "../utils/embeds/drops.js";

export default async function test(interaction, client) {
  const logChannels = [client.channels.cache.get('934688054818517093'), client.channels.cache.get('1378380823472115763')];

  const activity = {
    player: 'cj enjoyer', 
    date: "2022-06-25T12:00:00.000Z",
    details: "While testing the bot, I found a Christmas cracker",
    text: "I found a Christmas cracker",
    type: 'drop'
  }

  const embed = await drops(activity)

  for(const channel of logChannels){
    try{
      await channel.send(embed);
    }
    catch (error) {
      console.log(error.message);
      await interaction.reply(`Could not send message to ${channel.name}. Test failed.`);
      break;
    }
  }
};