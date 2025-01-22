# Model API

## Installation for development

1. Install <a href="https://github.com/pypa/pipx">Pipx</a> and <a href="https://python-poetry.org/docs/#installation">Poetry</a> if you haven't already.
2. Run `poetry install` in the `api` directory.
3. Install Poetry's plugin Poe ```poetry self add 'poethepoet[poetry-plugin]'```
4. Install Poetry's plugin for Dotenv ```poetry self add poetry-dotenv-plugin```
5. Run `poetry poe start` to start the server.
