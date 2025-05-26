import dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';
import ready from './events/ready.js';



const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {ready(client)});

client.login(process.env.DISCORD_TOKEN);