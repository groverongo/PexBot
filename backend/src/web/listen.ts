import { EndBehaviorType, joinVoiceChannel, VoiceConnectionStatus, VoiceReceiver } from "@discordjs/voice";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { client, DECODE_OPTIONS, OUT_DIRECTORY, TRANSCRIPTION_ENDPOINT } from "../constant";
import { opus } from "prism-media";
import {createReadStream, createWriteStream, fstat, promises} from 'fs';
import path from "path";
import { randomUUID } from "crypto";
import FormData from "form-data";
import axios from "axios";

const transcribe = async (audioFile: string): Promise<string> => {
    const formData = new FormData();
    formData.append("audio", createReadStream(path.join(OUT_DIRECTORY, audioFile)));

    const response = await axios.post(TRANSCRIPTION_ENDPOINT, formData);
    return response.data.transcript;
}

const voiceAudioStream = (receiver: VoiceReceiver, userId: string, outFile: string) => new Promise<void>((resolve, reject) => {
    const receiveStream = receiver.subscribe(userId, {
        end: {
            behavior: EndBehaviorType.AfterSilence,
            duration: 1000
        }
    });

    const decoderObject = new opus.Decoder(DECODE_OPTIONS);
    const writeStream = createWriteStream(path.join(OUT_DIRECTORY, outFile));
    receiveStream.pipe(decoderObject).pipe(writeStream);

    writeStream.on("finish", async () => {
        resolve();
    });

    writeStream.on("error", (err) => {
        reject(err);
    });
});

export const listenVoice = (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
    const connection = joinVoiceChannel({
        channelId: message.member?.voice.channelId as string,
        guildId: message.guildId as string,
        adapterCreator: message.guild?.voiceAdapterCreator as any,
        selfDeaf: false
    });

    const receiver = connection.receiver;

    let outPrefix: string;
    let audioPromise: Promise<void>;

    receiver.speaking.on('start', async (userId) => {
        if(userId === client.user?.id) return;
        console.log(`User ${userId} is speaking`);
        outPrefix = randomUUID();
        if (userId === message.member?.id) {
            audioPromise = voiceAudioStream(receiver, userId, `${outPrefix}.pcm`);
        }
    });

    receiver.speaking.on("end", async (userId) => {
        console.log(`User ${userId} has stopped speaking.`);
        await audioPromise;

    });
}