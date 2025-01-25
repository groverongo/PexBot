DOCKER_IMAGE_NAME = PexBot/bot

build\:docker:
	docker build -t $(DOCKER_IMAGE_NAME) . 

run\:docker:
	docker run -d --env-file .env $(DOCKER_IMAGE_NAME)