import { MessagesResponse } from "./schemas/schema";
import axios from "axios";
import fs from "fs";

const requestDiscordAPI = async (offsetIndex: number) => {   

    const offset: number = (offsetIndex)*25;

    const response = await axios.request({
        url: `/guilds/${process.env.GUILD_ID}/messages/search`,
        method: 'get',
        baseURL: process.env.DISCORD_API_URL,
        headers: {
            'Authorization': process.env.DISCORD_AUTH_TOKEN,
        },
        maxBodyLength: Infinity,
        params: {
            author_id: process.env.AUTHOR_ID,
            offset,
        },
    })

    const data: MessagesResponse = response.data as MessagesResponse;

    const messages: string[] = data.messages.map((m) => m[0].content);

    const rawMessages: string = messages.map((m) => m.replace(/\n/g, '\\n')).join('\n');
    
    fs.writeFileSync(`./data/messages-${offsetIndex}.txt`, rawMessages);
}

// fulfill the totalCalls with parallelCalls for each batch
const parallelRequest = async (lOffset: number, rOffset: number, parallelCalls: number=5) => {

    const totalCalls: number = rOffset - lOffset + 1;

    for (let i = lOffset; i < rOffset+1; i += parallelCalls) {
        const batchPromises: Promise<void>[] = [];

        for (let j = 0; j < parallelCalls; j++) {
            batchPromises.push(requestDiscordAPI(i+j));
        }

        await Promise.all(batchPromises);
        
        await new Promise((resolve) => setTimeout(resolve, 5000));

        console.log(`Batch ${i} from ${totalCalls/parallelCalls} completed`);
    }
}

parallelRequest(166,400, 5).catch(console.error);