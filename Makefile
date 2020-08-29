.PHONY: start start_electron

start:
	BROWSER=none npx react-scripts start

start_electron:
	ELECTRON_START_URL=http://localhost:3000 npx electron .

