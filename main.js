const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
        width: 540,
        height: 500,
        alwaysOnTop: true,
        resizable: false,
        maximizable: false,
        icon: path.join(__dirname, 'assets', 'icon.ico'),
        frame: false, // scoatem bara nativă
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    Menu.setApplicationMenu(null); // scoatem meniul nativ
    win.loadFile('index.html');
}

// Evenimente IPC pentru butoanele custom
ipcMain.on('window-minimize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.minimize();
});

ipcMain.on('window-close', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.close();
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
