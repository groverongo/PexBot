FAST_API = fastapi
SERVER_FILE = src/main.py
ENV_NAME = PexBot-api

DOCKER_IMAGE_NAME = PexBot/api

start:
	$(FAST_API) run $(SERVER_FILE)

start\:dev:
	$(FAST_API) dev $(SERVER_FILE) 

export:
	conda env export | grep -v "^prefix: " > environment.yml
	sed -i 's/name: .*/name: $(ENV_NAME)/' environment.yml

build\:docker:
	docker build -t $(DOCKER_IMAGE_NAME) --build-arg CONDA_ENV_NAME=$(ENV_NAME) . 