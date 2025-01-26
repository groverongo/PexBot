import { AudioResource, createAudioResource } from "@discordjs/voice";
import { ANTHEMS_PATH, client } from "../constant";
import { ModelRequest } from "../web/request.";
import { ANTHEMS_PATHS, joinUserChannel } from "../web/audios";
import path from 'path';
import { Message, OmitPartialGroupDMChannel } from "discord.js";

const messageCreate = async (message: OmitPartialGroupDMChannel<Message<boolean>>) =>  {
    const authorId: string = message.author.id;
    if(authorId === client.user?.id) return;

    const messageContent: string = message.content;

    if(!messageContent.startsWith("!")) return;

    const commandParts: string[] = messageContent.split(" ");

    if(commandParts.length <= 1) {
        message.reply("Missing command arguments.");
        return;
    }
    
    switch(commandParts[0]) {
        case "!g":
            console.log("Generation command received.");
            const request = new ModelRequest();
            commandParts.shift();
            try{
                await request.generateModel(commandParts.join(" "));
                message.reply(request.getResponse().response);
            } catch (e) {
                message.reply("Failed to generate response.");
            }
            break;
        case "!a":
            console.log("Anthem command received.");
            const player = joinUserChannel(message);
            // player.play(createAudioResource(path.join(ANTHEMS_PATH, "pop-1.mp3")))
            break;
    }

}

export default messageCreate;