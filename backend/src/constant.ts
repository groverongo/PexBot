import { createAudioPlayer, NoSubscriberBehavior } from "@discordjs/voice";
import { Client, GatewayIntentBits } from "discord.js";
import path from "path";

export const ANTHEMS_PATH: string = path.join(process.cwd(), "data", "anthems");

export const DISCORD_TOKEN: string = process.env.DISCORD_TOKEN as string;
export const MODEL_ENDPOINT: string = process.env.MODEL_ENDPOINT as string;

export const client = new Client({ intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping
]});