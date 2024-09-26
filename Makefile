install:
	npm install
	cd frontend && npm install

build:
	cd frontend && npm run build

start:
	cd backend && npx start-server -s ./frontend/build