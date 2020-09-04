const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs").promises;
const {
  default: installExtension,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");
const { channels } = require("../src/shared/constants");

let mainWindow;

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});

ipcMain.on(channels.PERSIST_EVENT, async (event, domainEvent) => {
  try {
    await persistEvent(domainEvent);
    event.sender.send(channels.PERSIST_EVENT, true);
  } catch {
    event.sender.send(channels.PERSIST_EVENT, false);
  }
});

ipcMain.on(channels.LOAD_EVENTS, async (event) => {
  try {
    const events = await loadEvents();
    event.sender.send(channels.LOAD_EVENTS, events);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No data file found");
      event.sender.send(channels.LOAD_EVENTS, []);
    } else {
      console.error(error);
      event.sender.send(channels.LOAD_EVENTS, error);
    }
  }
});

const SEPARATOR = "\n";

function persistEvent(domainEvent) {
  const dataFile = getDataFilePath();
  console.log("Writing to file", dataFile);
  return fs.appendFile(dataFile, JSON.stringify(domainEvent) + SEPARATOR, {
    encoding: "utf8",
  });
}

async function loadEvents() {
  const dataFile = getDataFilePath();
  console.log("Reading from file", dataFile);
  const rawData = await fs.readFile(dataFile, { encoding: "utf8" });
  const events = parseEvents(rawData);
  console.log("Loaded", events.length, "events");
  return events;
}

function getDataFilePath() {
  const dataDir = app.getPath("appData");
  return path.join(dataDir, app.getName(), "data.jsonl");
}

function parseEvents(data) {
  const lines = data.split(SEPARATOR);
  lines.pop();
  return lines.map(JSON.parse);
}
