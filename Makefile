build: build-api build-web
.PHONY:build

build-api:
	docker build -t chirper-api ./api
.PHONY:build-api

build-web:
	docker build -t chirper-web ./web
.PHONY:build-web

start:
	docker-compose up -d
.PHONY:start

stop:
	docker-compose down
.PHONY:stop