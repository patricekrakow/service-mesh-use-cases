NAME = patrice1972/scenario-01-service-a:1.0.1

default: build

build:
	docker build --tag $(NAME) .

push:
	docker push $(NAME)

run:
	docker run --publish 3000:3000 --detach $(NAME)

release: build push