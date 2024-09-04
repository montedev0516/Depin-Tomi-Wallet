import path from 'path'
import { app, ipcMain, shell, BrowserWindow } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import os from 'os'
import sys from 'systeminformation'
import Store from 'electron-store'
import url from 'url'
import {SuperfaceClient} from '@superfaceai/one-sdk'
import PublicIP from 'public-ip'

let count = 0;
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

  
// ----------------------------------------------Minimize IPC--------------------------------------------
  ipcMain.on('minimize',(event,arg) => {
    arg === true && mainWindow.minimize()
  })
})()
  
  ipcMain.handle('open-external-browser-url', async (event, url) => {
    console.log("Received url from renderer:", url);
    if (url) {
      await shell.openExternal(url);
      return true;
    }
  });

  // --------------------------------------------Com Data IPC----------------------------------
  ipcMain.on('getData', async (event, arg) => {
    let totalHd = 0, remainHd = 0;
    await sys.fsSize().then(datas => {
      for(const data of datas) {
        totalHd += data.size;
        remainHd += data.size - data.used;
      }
    })
    event.sender.send("getData", {
      cpu: `${os.cpus()[0].model} ${os.cpus().length} Cores`,
      ram: Math.ceil(os.totalmem() / 1024 / 1024 / 1024),
      totalHd: Math.ceil(totalHd / 1024 ** 4),
      remainHd: remainHd / 1024 ** 4
    })

  });
//   (async () => {
//     sys.fsSize().then(datas => {
//       let size = 0;
//       for(const data of datas) {
//         size += data.size - data.used;
//       }
//       console.log("hdhdhd", Math.ceil(size / 1024**3), "GB")
//     })
//     // sys.networkConnections().then(data => console.log("adf",data));
      
      
// })()
  // ------------------------------------------Net Information IPC-----------------------------------------
  let interval:any;
  ipcMain.on('getNetInfo', async (event, arg) => {
    if(arg === true){
      const downloadSpeeds:number[] = [], uploadSpeeds:number[] = [];
      let times = 1;
      while(times++ <= 10){
        await sys.networkStats().then((data: any) => {
          const downloadSpeed = (data[0].rx_sec / 1024);
          const uploadSpeed = (data[0].tx_sec / 1024);
          downloadSpeeds.push(downloadSpeed);
          uploadSpeeds.push(uploadSpeed);
        })
      }
      const calculateAverage = (array:number[]): number =>  {
        if (array.length === 0) {
            return 0; 
        }
        const total = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        const average = total / array.length; 
        return average;
      }
      
      event.sender.send("getNetInfo", {
        downloadSpeed:`${calculateAverage(downloadSpeeds).toFixed(2)} KB/s`,
        uploadSpeed:`${calculateAverage(uploadSpeeds).toFixed(2)} KB/s`
      })
  }
  else clearInterval(interval);
  })


// ----------------------------------------------Location IPC---------------------------------------------------

ipcMain.on('getLocation', async(event, arg) => {
  const sdk = new SuperfaceClient();
  const profile =  await sdk.getProfile("address/ip-geolocation@1.0.1");
  const networkInterface:any = await sys.networkInterfaces()
  const ipAddress = networkInterface[0].ip4;
  console.log(ipAddress)
  const result:any = await profile.getUseCase("IpGeolocation").perform(
      {
        ipAddress: "102.165.33.0"
      },
      {
        provider: "ipdata",
        security: {
          apikey: {
            apikey: "9a511b6fc8334e1852cfbbd4ff3f1af3c42ed6abc75e96a1648b969a"
          }
        }
      }
    ).then((data) => data.unwrap());
    console.log("country", result.addressCountry)
    event.sender.send("getLocation", result.addressCountry)
});

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
  console.log("count", count++)
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
            // console.log("====> ", params.address)
            new_store.clear()
            console.log("store",new_store.store)
            new_store.set("address", params.address);
            new_store.set("amount", params.amount);
            new_store.set("symbol", params.symbol);
            // console.log("hererererrerer", params.address)
            mainUIWindow.webContents.send("receiveCode", true);
          }
        }
      });
    }
  });
}
app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
