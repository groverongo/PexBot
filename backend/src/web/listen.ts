import { EndBehaviorType, joinVoiceChannel, VoiceConnectionStatus, VoiceReceiver } from "@discordjs/voice";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { client } from "../constant";
import { opus } from "prism-media";
import {promises} from 'fs';
import path from "path";
import { randomUUID } from "crypto";

const voiceAudioStream = (receiver: VoiceReceiver, userId: string) => {

    return new Promise<Buffer>((resolve, reject) => {
        const receiveStream = receiver.subscribe(userId, {
            end: {
                behavior: EndBehaviorType.AfterSilence,
                duration: 1000
            }
        });
    
        const decoderObject = new opus.Decoder({ rate: 16000, channels: 1, frameSize: 640 });
        receiveStream.pipe(decoderObject);
    
        const audioBuffers: Buffer[] = [];
    
        decoderObject.on("data", async (chunk) => {
            await promises.writeFile(path.join(process.cwd(), 'temp', `${randomUUID()}.ogg`), chunk);
            audioBuffers.push(chunk);
        });

        decoderObject.on("end", () => {
            const resultBuffer = Buffer.concat(audioBuffers);
            resolve(resultBuffer);
        });
    
        decoderObject.on("error", (error) => {
            reject(error);
        });
    });

}

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
}