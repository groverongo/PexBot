import { AudioResource } from "@discordjs/voice";
import { client } from "../constant";
import { ModelRequest } from "../web/request.";
import { ANTHEMS_PATHS, joinUserChannel } from "../web/audios";

client.on("messageCreate", async (message) => {
    const authorId: string = message.author.id;
    if(authorId === client.user?.id) return;

    const messageContent: string = message.content;

    if(!messageContent.startsWith("!")) return;

    const commandParts: string[] = messageContent.split(" ");

    if(commandParts.length <= 1) {
        return;
    }
    
    switch(commandParts[0]) {
        case "!g":
            const request = new ModelRequest();
            commandParts.shift();
            try{
                await request.generateModel(commandParts.join(" "));
                message.reply(request.getResponse().response);
            } catch (e) {
                message.reply("Failed to generate response.");
            }
            break;
        case "!h":
            const player = joinUserChannel(message);
            player.play(ANTHEMS_PATHS[commandParts[1]])
            break;
    }

});