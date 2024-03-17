const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1150,
    height: 900,

    /**
     * 1) Чтобы вставить вашу иконку приложения вместо дефолтной, расскомментируйте строку ниже и вставьте название файла иконки
     * Иконка должна находиться в директории assets или же поменяйте путь к файлу иконки
     */

    // icon: path.join(__dirname, 'assets', 'icon.png'),

    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenu(null);

  win.loadFile('src/index.html');

  /**
   * 2) Чтобы включить инструменты разработки (Dev Tools), расскомментируйте строку ниже и затем другую после
   */

  // win.webContents.on('before-input-event', (event, input) => {
  //   if (input.control && input.shift && input.key === 'I') {
  //     event.preventDefault();
  //   }
  // });

  /**
   * 3) Чтобы включить инструменты разработки (Dev Tools), расскомментируйте строку ниже
   */

  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
