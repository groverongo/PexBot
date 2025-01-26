import { AudioResource, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } from "@discordjs/voice";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import path from "path";
import { ANTHEMS_PATH } from "../constant";

export const ANTHEMS_PATHS: Record<string, AudioResource> = {
    "pop-1": createAudioResource(path.join(ANTHEMS_PATH, "pop-1.mp3")),
    "rock-1": createAudioResource(path.join(ANTHEMS_PATH, "rock-1.mp3")),
}

export const joinUserChannel = (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
    const audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause
        }
    });
    const connection = joinVoiceChannel({
        channelId: message.member?.voice.channelId as string,
        guildId: message.guildId as string,
        adapterCreator: message.guild?.voiceAdapterCreator as any
    });
    connection.subscribe(audioPlayer);
    audioPlayer.on("stateChange", (oldState, newState) => {
        if(newState.status === "idle") {
            connection.destroy();
            audioPlayer.stop();
        }
    });
    audioPlayer.on("error", (error) => {
        console.error(error);
    });
    return audioPlayer;
}