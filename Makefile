lint-frontend:
	cd frontend && npm run lint

install:
	npm install && cd frontend && npm install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build