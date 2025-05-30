import { AttachmentBuilder } from "discord.js";
import sharp from "sharp";

export default async function fetchAndResize(url) {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);
  const resizedBuffer = await sharp(imageBuffer).resize(50, 50, {fit: 'inside'}).png().toBuffer();
  return new AttachmentBuilder(resizedBuffer, { name: 'icon.png' });
};