import axios from "axios";
import { ModelResponseSchema, ModelResponseType } from "../schema/model";
import { MODEL_ENDPOINT } from "../constant";

export class ModelRequest {
    private response: ModelResponseType | null = null;

    public pingModel = async () => {
        const response = await axios.get(`${MODEL_ENDPOINT}`);
        console.log(response.data);
    };

    public generateModel = async (content: string, maxLength=15) => {
        const response = await axios.post(
            `${MODEL_ENDPOINT}/generate`, 
            {
                text: content,
                max_length: maxLength,
            }
        );

        const data = ModelResponseSchema.safeParse(response.data);
        if(data.success) {
            this.response = data.data;
        } else {
            throw new Error(data.error.message);
        }
    };

    public getResponse = () => {
        if (this.response === null) {
            throw new Error("Response is null");
        } else {
            return this.response;
        }
    };
}