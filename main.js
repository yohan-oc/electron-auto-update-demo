const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  autoUpdater.checkForUpdatesAndNotify();
});

// autoUpdater.on('update-available', () => {
//   dialog.showMessageBox({
//     type: 'info',
//     title: 'Update Available',
//     message: 'A new version is available. Downloading now...'
//   });
// });

// autoUpdater.on('update-downloaded', () => {
//   dialog.showMessageBox({
//     type: 'info',
//     title: 'Update Ready',
//     message: 'Update downloaded. It will be installed on restart.',
//     buttons: ['Restart Now']
//   }).then(result => {
//     if (result.response === 0) autoUpdater.quitAndInstall();
//   });
// });

// Update events
autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('update-status', 'Checking for updates...');
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-status', 'Update available! Downloading...');
});

autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('update-status', 'No new updates available.');
});

autoUpdater.on('download-progress', (progressObj) => {
  mainWindow.webContents.send('update-status', `Downloading: ${Math.round(progressObj.percent)}%`);
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update-status', 'Update downloaded! Restarting...');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (err) => {
  mainWindow.webContents.send('update-status', `Error: ${err.message}`);
});