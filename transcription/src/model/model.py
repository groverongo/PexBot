import torch
from transformers import pipeline
from model.constant import *

class Trancription_Meta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        
        return cls._instances[cls]
    
class Trancription(metaclass=Trancription_Meta):
    def __init__(self):
        self.device = 0 if torch.cuda.is_available() else -1
        self.transcription = pipeline(
            MODEL_TASK, 
            model=MODEL_NAME, 
            device=self.device,
        )
    
    def transcribe_audio(self, audio_path:  str, return_timestamps: bool):
        return self.transcription(audio_path, return_timestamps=return_timestamps)