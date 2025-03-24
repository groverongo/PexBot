import { client } from "../constant";
import { ModelRequest, SimilarityRequest, TranscriptionRequest } from "../web/request.";

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
    
    try{
        await new SimilarityRequest().pingService();
        console.info("Similarity API is available.");
    } catch(e) {
        console.error("Similarity API is not available.");
    }
}

export default ready;