from typing import Union
from fastapi import FastAPI, Request
from model.model import Sentence_Similarity
from os import path

app = FastAPI()


@app.get("/")
async def status():
    return {"status": "Server is running"}


@app.post("/action")
async def generate_text(request: Request):
    data = await request.json()

    response = Sentence_Similarity().return_similarities(data['text'])

    return {"response": response}