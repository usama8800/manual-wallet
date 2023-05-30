import { PrismaClient, Wallet } from '@prisma/client';
import * as dotenv from 'dotenv';
import { BrowserWindow, app, ipcMain } from 'electron';
import { createWriteStream } from 'fs';
import { Server, createServer } from 'http';
import { AddressInfo } from 'net';
import * as path from 'path';
import serveHandler from 'serve-handler';
import { getRandomWallet } from './crypto';

const file = createWriteStream(path.join(__dirname, 'log.log'));
file.write('\n\nStarting app\n');
dotenv.config();
file.write('Loaded env\n');
file.write(`Mode: ${process.env.MODE}\n`);
app.setPath('userData', path.join(__dirname, 'storage'));

let mainWindow: Electron.BrowserWindow | null;
function createWindow() {
  file.write('Creating window\n');
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

  let server: Server;
  if (process.env.MODE === 'dev') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    file.write('Creating server\n');
    server = createServer((request, response) => serveHandler(request, response, {
      public: path.resolve(__dirname, 'www'),
    }));
    server.listen({ port: 0, host: 'localhost' }, () => {
      const address = server.address() as AddressInfo;
      mainWindow?.loadURL('http://localhost:' + address.port);
      file.write(`Server listening on ${address.port}\n`);
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    prisma.$disconnect();
    if (server) server.close();
  });
}

app.on('ready', createWindow);

function errorHandler(error: Error) {
  file.write(`${error.message}\n\n${error.stack}`);
  if (app) app.quit();
}
process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);
