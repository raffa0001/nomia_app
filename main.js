// spark-keeper/main.js
const { app, BrowserWindow, Menu, Tray, nativeImage, shell, ipcMain } = require('electron');
const path = require('path');

// --- CONFIGURATION ---
const DASHBOARD_URL = "http://localhost:3000/vendor/dashboard";

let mainWindow;
let tray;
let isQuiting = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Nomia",
        icon: path.join(__dirname, 'icon.png'),

                                   // 1. REMOVE NATIVE TITLE BAR
                                   frame: false,

                                   // Optional: specific style for macOS to keep traffic lights if you wanted
                                   // titleBarStyle: 'hidden',

                                   webPreferences: {
                                       nodeIntegration: false,
                                       contextIsolation: true,
                                       backgroundThrottling: false,

                                       // 2. CONNECT PRELOAD SCRIPT (Critical)
                                       preload: path.join(__dirname, 'preload.js')
                                   },
                                   autoHideMenuBar: true,
                                   backgroundColor: '#111111'
    });

    mainWindow.loadURL(DASHBOARD_URL);

    // Open external links in default browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });

    mainWindow.on('close', (event) => {
        if (!isQuiting) {
            event.preventDefault();
            mainWindow.hide();
            return false;
        }
    });
}

// 3. HANDLE BUTTON CLICKS FROM FRONTEND
ipcMain.on('window-minimize', () => {
    mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});

ipcMain.on('window-close', () => {
    // This triggers the 'close' event defined in createWindow
    // which checks the isQuiting flag
    mainWindow.close();
});

function createTray() {
    const iconPath = path.join(__dirname, 'icon.png');
    const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16 });

    tray = new Tray(trayIcon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open Dashboard', click: () => mainWindow.show() },
                                               { label: 'Hide', click: () => mainWindow.hide() },
                                               { type: 'separator' },
                                               {
                                                   label: 'Quit Nomia',
                                                   click: () => {
                                                       isQuiting = true;
                                                       app.quit();
                                                   }
                                               }
    ]);

    tray.setToolTip('Nomia - Node Online');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (!mainWindow.isVisible()) mainWindow.show();
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        createWindow();
        createTray();
    });
}
