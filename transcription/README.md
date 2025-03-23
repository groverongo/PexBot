# Transcription API

This is the API for the Transcription Module. It is a FastAPI application that serves the AI model.

## Installation for development

1. Install conda3 if you haven't already.
2. Run `conda create -f environment.yml` in the `api` directory.

## Makefile Actions

- `start`: Start the bot in production mode.
- `start:dev`: Start the bot in development mode.
- `export`: Export the conda environment to `environment.yml`.
- `build:docker`: Build the Docker image.
- `run:docker`: Run the Docker container.

## Routes

- `/`: The root route. Returns a welcome message.
- `/transcribe`: The transcription route. Accepts a POST request with a FormData body containing the audio file. Returns a JSON response with the transcription.