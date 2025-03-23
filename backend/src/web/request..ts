import axios from "axios";
import { ModelResponseSchema, ModelResponseType } from "../schema/model";
import { MODEL_ENDPOINT, TRANSCRIPTION_ENDPOINT } from "../constant";
import { TranscriptionResponseType } from "../schema/transcription";

abstract class BaseServiceRequest<ResponseType>{
    private _response: ResponseType | null = null;
    protected abstract ENDPOINT: string;

    public async pingService(): Promise<void> {
        const response = await axios.get(`${this.ENDPOINT}`);
        console.log(response.data);
    }

    public get response(): ResponseType {
        if (this._response === null) {
            throw new Error("Response is null");
        }
        return this._response;
    }

    protected set response(response: ResponseType) {
        this._response = response;
    }
};

export class ModelRequest extends BaseServiceRequest<ModelResponseType> {

    protected ENDPOINT: string = MODEL_ENDPOINT;

    public generateModel = async (content: string, maxLength=15) => {
        const response = await axios.post(
            `${this.ENDPOINT}/generate`, 
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
}

export class TranscriptionRequest extends BaseServiceRequest<TranscriptionResponseType> {

    protected ENDPOINT: string = TRANSCRIPTION_ENDPOINT;


}