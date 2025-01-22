import torch
from transformers import pipeline
from model.constant import *

class Text_Generator_Meta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        
        return cls._instances[cls]
    
class Text_Generator(metaclass=Text_Generator_Meta):
    def __init__(self):
        self.device = 0 if torch.cuda.is_available() else -1
        self.text_generator = pipeline(MODEL_TASK, model=MODEL_NAME, device=self.device)
    
    def generate_text(self, text:  str, max_length: int):
        return self.text_generator(text, max_length=max_length)[0]['generated_text']