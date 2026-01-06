const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sparkElectron', {
    minimize: () => ipcRenderer.send('window-minimize'),
                                maximize: () => ipcRenderer.send('window-maximize'),
                                close: () => ipcRenderer.send('window-close'),
                                // Check if we are running in Electron
                                isElectron: true
});
