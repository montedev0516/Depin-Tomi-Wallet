import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
  send(channel: string, value?: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

contextBridge.exposeInMainWorld('ipc', handler)

contextBridge.exposeInMainWorld('walletConnect', {
  ipcRenderer: {
      invoke: (channel : any, ...args: any) => ipcRenderer.invoke(channel, ...args),
      on: (channel : any, listener : any) => ipcRenderer.on(channel, listener),
      // Add other methods as needed
    },
  openURL: (url: string) => {
      ipcRenderer.invoke('open-external-browser-url', url);
  },
  receiveCode: (handler : any) => ipcRenderer.on('receiveCode', (event, ...args) => handler(...args)),
});

export type IpcHandler = typeof handler
