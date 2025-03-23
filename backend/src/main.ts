import messageCreate from "./config/messageCreate";
import ready from "./config/ready";
import { client, DISCORD_TOKEN } from "./constant";

client.on("ready", ready);

client.on("messageCreate", messageCreate);

client.login(DISCORD_TOKEN);