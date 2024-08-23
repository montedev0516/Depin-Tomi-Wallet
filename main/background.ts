import path from 'path'
import { app, ipcMain, shell, BrowserWindow } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import os from 'os'
import sys from 'systeminformation'
import Store from 'electron-store'
import url from 'url'

const isProd = process.env.NODE_ENV === 'production'
let new_store = new Store();
let mainUIWindow: BrowserWindow;
const protocol = "tomidepin";

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(protocol, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient(protocol);
}

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

; (async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 900,
    resizable: false,
    center: true,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    },
    icon: "./resources/favicon.ico",
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
  })

  mainUIWindow = mainWindow;

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}`)
    mainWindow.webContents.openDevTools()
  }
  ipcMain.on('minimize', (event, arg) => {
    arg === true && mainWindow.minimize()
  })

  ipcMain.handle('open-external-browser-url', async (event, url) => {
    console.log("Received url from renderer:", url);
    if (url) {
      await shell.openExternal(url);
      return true;
    }
  });

  // console.log('cpu:', `${os.cpus()[0].model} ${os.cpus().length}`,'\nram:',`${Math.ceil(os.totalmem() / 1024 / 1024 / 1024)}GB, hd:${hd}`)
  ipcMain.on('getData', async (event, arg) => {
    let hd;
    await sys.diskLayout().then(async (data) => {
      hd = String(Math.ceil(data[0].size / 1024 / 1024 / 1024 / 1024) + "TB")
    })
    event.sender.send("getData", {
      cpu: `${os.cpus()[0].model} ${os.cpus().length} Cores`,
      ram: `${Math.ceil(os.totalmem() / 1024 / 1024 / 1024)}GB`,
      hd: hd
    })

  })
})()

ipcMain.handle("getWalletInfo", async (event) => {
  const address = new_store.get("address");
  const amount = new_store.get("amount");
  const symbol = new_store.get("symbol");
  return {address, amount, symbol};
});

const gotTheLock = app.requestSingleInstanceLock();
const ProtocolRegExp = new RegExp(`^${protocol}://`);

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    console.log(commandLine)
    if (mainUIWindow) {
      console.log("-----------")
      if (mainUIWindow.isMinimized()) mainUIWindow.restore();
      mainUIWindow.focus();
      commandLine.forEach((str) => {
        if (ProtocolRegExp.test(str)) {
          const params = url.parse(str, true).query;
          if (params && params.address) {
            console.log("====> ", params.address)
            // new_store.delete("address")
            // new_store.delete("amount")
            // new_store.delete("symbol")
            // new_store.set("address", params.address);
            // new_store.set("amount", params.amount);
            // new_store.set("stymbol", params.stymbol);
            mainUIWindow.webContents.send("receiveCode", params.address);
          }
        }
      });
    }
  });
}
app.on('window-all-closed', () => {
  app.quit()
})

// window.addEventListener("resize",() => {
//   console.log("----------")
//   window.innerWidth = window.innerHeight * 1.1;
// })

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

// ipcMain.on("getData",(event, arg) => {
//   event.sender.send("getData",os.totalmem)
// })

