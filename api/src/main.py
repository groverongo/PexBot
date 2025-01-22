from typing import Union
from fastapi import FastAPI, Request
from model.model import Text_Generator

app = FastAPI()


@app.get("/")
async def status():
    return {"status": "Server is running"}


@app.post("/generate")
async def generate_text(request: Request):
    data = await request.json()
    response = Text_Generator().generate_text(data.text, data.max_length)
    return {"response": response}