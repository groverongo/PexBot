import axios from "axios";
import { ModelResponseSchema, ModelResponseType } from "../schema/model";

export class ModelRequest {
    private response: ModelResponseType | null = null;

    public generateModel = async (content: string, maxLength=15) => {
        const response = await axios.post(process.env.MODEL_ENDPOINT as string, {
            text: content,
            max_length: maxLength,
        });

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