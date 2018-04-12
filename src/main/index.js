import { app, BrowserWindow, screen } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  // 添加Vue扩展工具到devTool
  // https://electronjs.org/docs/tutorial/devtools-extension
  BrowserWindow.addDevToolsExtension('/Users/wangxin/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/4.1.4_0');

  /**
   * Initial window options
   */
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    height,
    width,
    useContentSize: true,
    titleBarStyle: 'hiddenInset',
    frame: false,
    transparent: true,
  });

  mainWindow.loadURL(winURL);

  if (mainWindow.isMaximized) {
    mainWindow.maximize();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 资源加载完后再显示窗口
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    mainWindow.focus();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
