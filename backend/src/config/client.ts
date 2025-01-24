import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN } from "../constant";
import { ModelRequest } from "../web/request.";

export const client = new Client({ intents: [
  GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping
]});

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", async (message) => {
    const authorId: string = message.author.id;
    if(authorId === client.user?.id) return;

    const request = new ModelRequest();
    await request.generateModel(message.content);
    message.reply(request.getResponse().response);
});