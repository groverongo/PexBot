import { EndBehaviorType, joinVoiceChannel, VoiceConnectionStatus, VoiceReceiver } from "@discordjs/voice";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { client, DECODE_OPTIONS } from "../constant";
import { opus } from "prism-media";
import {createWriteStream, fstat, promises} from 'fs';
import path from "path";
import { randomUUID } from "crypto";

const voiceAudioStream = (receiver: VoiceReceiver, userId: string) => new Promise<Buffer>((resolve, reject) => {
    const receiveStream = receiver.subscribe(userId, {
        end: {
            behavior: EndBehaviorType.AfterSilence,
            duration: 1000
        }
    });

    const decoderObject = new opus.Decoder(DECODE_OPTIONS);
    const writeStream = createWriteStream(path.join(process.cwd(), "temp", `${randomUUID()}.pcm`));
    receiveStream.pipe(decoderObject).pipe(writeStream);
});

export const listenVoice = (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
    const connection = joinVoiceChannel({
        channelId: message.member?.voice.channelId as string,
        guildId: message.guildId as string,
        adapterCreator: message.guild?.voiceAdapterCreator as any,
        selfDeaf: false
    });

    const receiver = connection.receiver;

    receiver.speaking.on('start', async (userId) => {
        if(userId === client.user?.id) return;
        console.log(`User ${userId} is speaking`);
        if (userId === message.member?.id) {
            let transcription = "";

            const inputAudio = await voiceAudioStream(receiver, userId);
        }
    });

    receiver.speaking.on("end", (userId) => {
        console.log(`User ${userId} has stopped speaking.`);
    });
}