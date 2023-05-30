import { PrismaClient, Wallet } from '@prisma/client';
import * as dotenv from 'dotenv';
import { BrowserWindow, app, ipcMain } from 'electron';
import { Server, createServer } from 'http';
import { AddressInfo } from 'net';
import * as path from 'path';
import serveHandler from 'serve-handler';
import { getRandomWallet } from './crypto';

dotenv.config();
app.setPath('userData', path.join(__dirname, 'storage'));

let mainWindow: Electron.BrowserWindow | null;
function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Manual Wallet',
    show: false,
    autoHideMenuBar: true,
  });
  mainWindow.maximize();
  mainWindow.show();
  const prisma = new PrismaClient();

  ipcMain.handle('generateWallet', (_, symbol: string) => {
    return getRandomWallet(symbol);
  });
  ipcMain.handle('addWallet', async (_, wallet: Wallet) => {
    return await prisma.wallet.create({ data: wallet });
  });
  ipcMain.handle('updateWallet', async (_, id: number, data: any) => {
    return await prisma.wallet.update({ data, where: { id } });
  });
  ipcMain.handle('getNetworks', async () => {
    return await prisma.network.findMany();
  });
  ipcMain.handle('getWallets', async () => {
    return await prisma.wallet.findMany();
  });
  ipcMain.handle('back', () => {
    mainWindow?.webContents.goBack();
  });

  let server: Server;
  if (process.env.MODE === 'dev') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    server = createServer((request, response) => {
      return serveHandler(request, response, {
        public: path.join(__dirname, '..', 'out'),
      });
    });
    server.listen({ port: 0, host: 'localhost' }, () => {
      const address = server.address() as AddressInfo;
      mainWindow?.loadURL('http://localhost:' + address.port);
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    prisma.$disconnect();
    if (server) server.close();
  });
}

app.on('ready', createWindow);
