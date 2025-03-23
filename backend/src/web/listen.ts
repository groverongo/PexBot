import { EndBehaviorType, joinVoiceChannel, VoiceReceiver } from "@discordjs/voice";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { client, DECODE_OPTIONS, OUT_DIRECTORY } from "../constant";
import { opus } from "prism-media";
import { createWriteStream } from 'fs';
import path from "path";
import { randomUUID } from "crypto";
import { TranscriptionRequest } from "./request.";

const voiceAudioStream = (receiver: VoiceReceiver, userId: string, outPath: string) => new Promise<void>((resolve, reject) => {
    const receiveStream = receiver.subscribe(userId, {
        end: {
            behavior: EndBehaviorType.AfterSilence,
            duration: 5000
        }
    });

    const decoderObject = new opus.Decoder(DECODE_OPTIONS);
    const writeStream = createWriteStream(outPath);
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
    let outPath: string;
    let audioPromise: Promise<void>;

    receiver.speaking.on('start', async (userId) => {
        if(userId === client.user?.id) return;
        if (userId === message.member?.id) {
            console.log(`User ${userId} is speaking`);
            outPrefix = randomUUID();
            outPath = path.join(OUT_DIRECTORY, `${outPrefix}.pcm`);
            audioPromise = voiceAudioStream(receiver, userId, outPath);
        }
    });

    receiver.speaking.on("end", async (userId) => {
        if (userId === message.member?.id) {
            console.log(`User ${userId} has stopped speaking.`);
            await audioPromise;
            const transcriptClient =  new TranscriptionRequest()
            await transcriptClient.transcribe(outPath);
    
            console.log("User", userId, "said:",transcriptClient.response.response.text);
        }
    });
}