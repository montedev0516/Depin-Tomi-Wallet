import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import fs from 'fs-extra'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width:1000, 
    height:900,
    resizable:false,
    center:true,
    maximizable:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      contextIsolation:true
    },
    icon:"./resources/favicon.ico",
    autoHideMenuBar:true,
    frame:false,
    transparent:true,
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
