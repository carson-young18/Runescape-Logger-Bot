import dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';
import ready from './events/ready.js';
import test from './commands/test.js';


const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {ready(client)});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'test') {
    await test(interaction, client);
  }
});

client.login(process.env.DISCORD_TOKEN);
