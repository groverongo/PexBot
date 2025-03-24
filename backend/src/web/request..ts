import axios from "axios";
import { ModelResponseSchema, ModelResponseType } from "../schema/model";
import { MODEL_ENDPOINT, SIMILARITY_ENDPOINT, TRANSCRIPTION_ENDPOINT } from "../constant";
import { TranscriptionResponseSchema, TranscriptionResponseType } from "../schema/transcription";
import FormData from "form-data";
import { createReadStream } from 'fs';
import { SimilarityResponseSchema, SimilarityResponseType } from "../schema/similarity";

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

    public transcribe = async (audioFilePath: string) => {
        const formData = new FormData();
        formData.append("audio", createReadStream(audioFilePath));

        const response = await axios.post(`${this.ENDPOINT}/transcribe`, formData);
        const data = TranscriptionResponseSchema.safeParse(response.data);
        if(data.success) {
            this.response = data.data;
        } else {
            throw new Error(data.error.message);
        }
    }
}

export class SimilarityRequest extends BaseServiceRequest<SimilarityResponseType>{
    
    protected ENDPOINT: string = SIMILARITY_ENDPOINT;

    public getSimilarity = async (text: string) => {
        const response = await axios.post(
            `${this.ENDPOINT}/action`, 
            {
                text
            }
        );

        const data = SimilarityResponseSchema.safeParse(response.data);
        if(data.success) {
            this.response = data.data;
        } else {
            throw new Error(data.error.message);
        }
    }
}