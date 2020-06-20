import {
  app, protocol, BrowserWindow, ipcMain,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'electron';
import {
  createProtocol,
  installVueDevtools,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWin;
let loginWin;

const loginWindowOptions = {
  width: 300,
  height: 600,
  resizable: false,
  maximizable: false,
  fullscreenable: false,
  show: false,
  webPreferences: {
    nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
  },
};
const mainWindowOptions = {
  width: 1024,
  height: 768,
  resizable: true,
  maximizable: true,
  fullscreenable: false,
  show: false,
  webPreferences: {
    nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
  },
};

// Removed in Favour of Multi-Window
/* function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    // Use pluginOptions.nodeIntegration, leave this alone
    // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
    // for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
} */

function createWindow(devPath, prodPath, options) {
  // Create the browser window.
  let window = new BrowserWindow(options);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
    // if (!process.env.IS_TEST) window.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    window.loadURL(`app://./${prodPath}`);
  }

  window.on('closed', () => {
    window = null;
  });
  window.once('ready-to-show', () => {
    window.show();
  });
  // disables from opening new window
  window.webContents.on('new-window', (event) => {
    event.preventDefault();
    // refer https://stackoverflow.com/questions/46462248/electron-link-opens-in-new-window
  });
  return window;
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWin === null) {
    loginWin = createWindow('login', 'login.html', loginWindowOptions);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron
    // and uncomment these lines
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app');
  }
  // createWindow();
  loginWin = createWindow('login', 'login.html', loginWindowOptions);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

ipcMain.on('start-main-window', (e, token) => {
  mainWin = createWindow('main', 'main.html', mainWindowOptions);
  mainWin.webContents.on('did-finish-load', () => {
    loginWin.close();
    mainWin.maximize();
    mainWin.webContents.send('token', token);
  });
});
