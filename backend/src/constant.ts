import { createAudioPlayer, NoSubscriberBehavior } from "@discordjs/voice";
import { Client, GatewayIntentBits } from "discord.js";
import path from "path";

export const ANTHEMS_PATH: string = path.join(process.cwd(), "data", "anthems");

export const DISCORD_TOKEN: string = process.env.DISCORD_TOKEN as string;
export const MODEL_ENDPOINT: string = process.env.MODEL_ENDPOINT as string;
export const TRANSCRIPTION_ENDPOINT: string = process.env.TRANSCRIPTION_ENDPOINT as string;
export const SIMILARITY_ENDPOINT: string = process.env.SIMILARITY_ENDPOINT as string;

export const OUT_DIRECTORY: string = path.join(process.cwd(), "temp");

export const DECODE_OPTIONS = {
    rate: 16000,
    channels: 1,
    frameSize: 640
} 

export const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
]});