import discord
from transformers import pipeline
import torch
import os
os.environ['HF_HOME'] = './models'

device = 0 if torch.cuda.is_available() else -1
pipe = pipeline("text-generation", model="prober76/pex-gpt2", device=device)

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_message(message):
    print(f'Message from {message.author}: {message.content}')
    if message.author == client.user:
        return
    
    if message.content.startswith('$'):
        text = message.content[1:]
        response = pipe(text, max_length=15)[0]['generated_text']

        # if response has text from the input, remove it
        if response.startswith(text):
            response = response[len(text):]

        await message.channel.send(response)

client.run(os.getenv('DISCORD_TOKEN'))