import { client } from "../constant";
import { ModelRequest, TranscriptionRequest } from "../web/request.";

const ready = async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    try{
        await new ModelRequest().pingService();
    } catch(e) {
        console.error("Model API is not available.");
    }

    try{
        await new TranscriptionRequest().pingService();
    } catch(e) {
        console.error("Transcription API is not available.");
    }
    
}

export default ready;