import torch
from sentence_transformers import SentenceTransformer
from model.constant import *

class Sentence_Similarity_Meta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        
        return cls._instances[cls]
    
class Sentence_Similarity(metaclass=Sentence_Similarity_Meta):

    ACTIONS = {
        "anthem-rock": 'Reproduce una canción de rock',
        "anthem-pop": 'Reproduce una canción de pop',
        "music": 'Reproduce musica',
    }

    def __init__(self):
        self.device = 'cuda' if torch.cuda.is_available() else "cpu"
        self.model = SentenceTransformer(MODEL_NAME, device=self.device)
    
    def return_similarities(self, text_input:  str):
        embeddings = self.model.encode([text_input, *self.ACTIONS.values()])
        print(embeddings.shape)
        
        cosine_similarities = self.model.similarity(embeddings[0], embeddings[1:])
        print(cosine_similarities)

        return {action: similarity for action, similarity in zip(self.ACTIONS.keys(), cosine_similarities[0].tolist())}