import { client } from "../constant";
import { ModelRequest, TranscriptionRequest } from "../web/request.";

const ready = async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    try{
        await new ModelRequest().pingService();
        console.info("Model API is available.");
    } catch(e) {
        console.error("Model API is not available.");
    }

    try{
        await new TranscriptionRequest().pingService();
        console.info("Transcription API is available.");
    } catch(e) {
        console.error("Transcription API is not available.");
    }
    
}

export default ready;