import { app, BrowserWindow, globalShortcut, ipcMain, shell } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

app.commandLine.appendSwitch('ignore-certificate-errors');

let mainWindow: BrowserWindow;
let splashWindow: BrowserWindow;

ipcMain.on('open-external-url', (event, url) => {
  shell.openExternal(url);
});

const createSplashWindow = () => {
  splashWindow = new BrowserWindow({
    width: 500,
    height: 350,
    frame: false,
    hasShadow: false,
    backgroundColor: '#00000000',
    transparent: true,
    alwaysOnTop: true,
    center: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    const serverUrl = new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    splashWindow.loadURL(`${serverUrl.origin}/splash.html`);
  } else {
    splashWindow.loadFile(path.join(__dirname, '../renderer/main_window/splash.html'));
  }
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    titleBarStyle: 'hidden',
    show: false,
    ...(process.platform !== 'darwin' ? { titleBarOverlay: {
        color: '#00000000',
        symbolColor: '#171717',
        height: 32
      } } : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      devTools: true,
      contextIsolation: true,
    },
  });

  mainWindow.setMenu(null)

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.once('ready-to-show', () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
      splashWindow.destroy();
    }
    mainWindow.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createSplashWindow();
  createWindow();

  globalShortcut.register('F12', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.webContents.toggleDevTools();
  });

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.webContents.toggleDevTools();
  });
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
