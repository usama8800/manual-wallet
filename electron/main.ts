import * as dotenv from 'dotenv';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

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
  });
  mainWindow.maximize();
  mainWindow.show();

  ipcMain.handle('ping', async () => {
    return 'pong';
  });

  if (process.env.MODE === 'dev') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
