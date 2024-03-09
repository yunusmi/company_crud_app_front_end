const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1150,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenu(null);

  win.loadFile('src/index.html');

  /**
   * 1) To turn on Dev tools, comment the line below and uncomment other second line after
   */

  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key === 'I') {
      event.preventDefault();
    }
  });

  /**
   * 2) To turn on Dev tools, uncomment the line below
   */

  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register('CommandOrControl+Shift+I', () => {});
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
