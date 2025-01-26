# Model API

This is the API for the Model project. It is a Flask application that serves the AI model.

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
- `/generate`: The prediction route. Accepts a POST request with a JSON body containing the input data. Returns a JSON response with the prediction.