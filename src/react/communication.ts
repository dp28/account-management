import { channels } from "../shared/constants";
import { DomainEvent } from "../domain";

interface IpcRenderer {
  send: (channelName: string, ...args: any[]) => void;
  on: <T>(event: any, arg: T) => void;
  removeAllListeners: (channelName: string) => void;
}

function getIpcRenderer(): IpcRenderer {
  // Based on https://medium.com/@johndyer24/building-a-production-electron-create-react-app-application-with-shared-code-using-electron-builder-c1f70f0e2649
  return (window as any).ipcRenderer as IpcRenderer;
}

export function buildRequestFunction<ResponseType, InputType = void>(
  channelName: string
): (input: InputType) => Promise<ResponseType> {
  return (input) =>
    new Promise((resolve) => {
      const ipcRenderer = getIpcRenderer();
      ipcRenderer.send(channelName, input);
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
export const persistEvent = buildRequestFunction<boolean, DomainEvent<any>>(
  channels.PERSIST_EVENT
);
export const loadEvents = buildRequestFunction<DomainEvent<any>[]>(
  channels.LOAD_EVENTS
);
