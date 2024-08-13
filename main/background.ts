import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    maxWidth:1000, 
    maxHeight:900,
    minWidth:1000,
    minHeight:900,
    center:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon:"./resources/faviicon.ico"
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}`)
    mainWindow.webContents.openDevTools()
  }
  
})()

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
