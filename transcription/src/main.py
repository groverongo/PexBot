from typing import Union
from fastapi import FastAPI, Request
from model.model import Trancription
from os import path
from util import normalize

from constant import TMP_DIR

app = FastAPI()


@app.get("/")
async def status():
    return {"status": "Server is running"}


@app.post("/transcribe")
async def generate_text(request: Request):
    data = await request.form()
    entry = data.get("audio")
    save_path = path.join(TMP_DIR, entry.filename)
    with open(save_path, "wb") as audio:
        audio.write(entry.file.read())

    if normalize.get_ext(save_path) == "pcm":
        mp3_filename = normalize.change_ext(entry.filename, ".mp3")
        mp3_path = path.join(TMP_DIR, mp3_filename)
        normalize.pcm_to_mp3(save_path, mp3_path)
        save_path = mp3_path

    response = Trancription().transcribe_audio(save_path, True)
    return {"response": response}