NAME = patrice1972/demo-uc-02b-client-x:1.0.0

default: build

build:
	docker build --tag $(NAME) .

push:
	docker push $(NAME)

run:
	docker run --publish 3000:3000 --detach $(NAME)

release: build push
