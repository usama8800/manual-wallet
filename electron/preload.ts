import { Network, Wallet } from '@prisma/client';
import { contextBridge, ipcRenderer } from 'electron';

declare global {
  interface Window {
    electron: {
      generateWallet: (symbol: string) => Promise<{ address: string, privateKey: string }>,
      addWallet: (wallet: Wallet) => Promise<Wallet>,
      updateWallet: (id: number, data: any) => Promise<Wallet>,
      getNetworks: () => Promise<Network[]>,
      getWallets: () => Promise<Wallet[]>,
    },
  }
}

window.electron = window.electron || {} as any;

contextBridge.exposeInMainWorld('electron', {
  generateWallet: (symbol: string) => ipcRenderer.invoke('generateWallet', symbol),
  addWallet: (wallet: Wallet) => ipcRenderer.invoke('addWallet', wallet),
  updateWallet: (id: number, data: any) => ipcRenderer.invoke('updateWallet', id, data),
  getNetworks: () => ipcRenderer.invoke('getNetworks'),
  getWallets: () => ipcRenderer.invoke('getWallets'),
});
