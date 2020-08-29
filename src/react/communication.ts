import { channels } from "../shared/constants";

interface IpcRenderer {
  send: (channelName: string) => void;
  on: <T>(event: any, arg: T) => void;
  removeAllListeners: (channelName: string) => void;
}

// Based on https://medium.com/@johndyer24/building-a-production-electron-create-react-app-application-with-shared-code-using-electron-builder-c1f70f0e2649
const ipcRenderer: IpcRenderer = (window as any).ipcRenderer;

export function buildRequestFunction<ResponseType>(
  channelName: string
): () => Promise<ResponseType> {
  return () =>
    new Promise((resolve) => {
      ipcRenderer.send(channelName);
      ipcRenderer.on(channelName, (_event: any, response: ResponseType) => {
        ipcRenderer.removeAllListeners(channelName);
        resolve(response);
      });
    });
}

export interface AppInfo {
  appName: string;
  appVersion: string;
}

export const requestAppInfo = buildRequestFunction<AppInfo>(channels.APP_INFO);
