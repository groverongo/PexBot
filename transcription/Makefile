FAST_API = fastapi
SERVER_FILE = src/main.py
ENV_NAME = PexBot-transcription

DOCKER_IMAGE_NAME = PexBot/api

start:
	$(FAST_API) run $(SERVER_FILE)

start\:dev:
	$(FAST_API) dev $(SERVER_FILE) --port 8001

export:
	conda env export | grep -v "^prefix: " > environment.yml
	sed -i 's/name: .*/name: $(ENV_NAME)/' environment.yml

build\:docker:
	docker build -t $(DOCKER_IMAGE_NAME) --build-arg CONDA_ENV_NAME=$(ENV_NAME) . 

run\:docker:
	docker run -d -p 8000:8000 --env-file .env $(DOCKER_IMAGE_NAME)