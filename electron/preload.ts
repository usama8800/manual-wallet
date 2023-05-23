import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
})
