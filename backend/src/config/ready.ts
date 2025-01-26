import { client } from "../constant";
import { ModelRequest } from "../web/request.";

const ready = async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    const request = new ModelRequest();
    try{
        await request.pingModel();
    } catch(e) {
        console.error("Model API is not available.");
    }
}

export default ready;