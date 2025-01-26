import { AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } from "@discordjs/voice";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import path from "path";
import { ANTHEMS_PATH } from "../constant";

export const playAnthem = (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
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

    const anthem = message.content.split(" ")[1];
    audioPlayer.play(createAudioResource(path.join(ANTHEMS_PATH, `${anthem}.mp3`)));

    audioPlayer.on(AudioPlayerStatus.Playing, () => {
        console.log('The audio player has started playing!');
    });
    audioPlayer.on(AudioPlayerStatus.Idle, () => {
        console.log('The audio player has finished playing and has been idle.');
        connection.destroy();
        audioPlayer.stop();
    });
    audioPlayer.on("error", (error) => {
        console.error(error);
    });
    return audioPlayer;
}