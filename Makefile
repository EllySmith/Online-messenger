install:
	npm install
	cd frontend && npm install

build:
	cd frontend && npm start

start:
	npx start-server -s ./frontend/build