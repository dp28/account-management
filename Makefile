.PHONY: start start_electron test

start:
	BROWSER=none npx react-scripts start

start_electron:
	ELECTRON_START_URL=http://localhost:3000 npx electron .

test:
	npx react-scripts test

