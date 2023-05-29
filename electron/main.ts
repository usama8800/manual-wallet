import { PrismaClient, Wallet } from '@prisma/client';
import * as dotenv from 'dotenv';
import { BrowserWindow, app, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
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

  console.log(process.env.MODE);
  if (process.env.MODE === 'dev') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '..', 'out', '/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
    mainWindow.loadURL('http://localhost:3000');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    prisma.$disconnect();
  });
}

app.on('ready', createWindow);
