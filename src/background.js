'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
//import { autoUpdater } from 'electron-updater'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const base64Img = require('base64-img')

let win
let actualizacion


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function buscarActualizacion(){
  console.log('buscando actualización....')
  autoUpdater.checkForUpdates()
  autoUpdater.on('update-downloaded', () => {

    setTimeout(()=>{ // ESPERA 10 SEGUNDOS PARA ENVIAR EL MENSAJE DE QUE DEBE SER ACTUALIZADA LA APP
      win.webContents.send('actualizacion_disponible', true)
    }, 10000)

    clearInterval(actualizacion) // al momento de descargar la actualizacion detiene el ciclo de busqueda

  })
}

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1240,
    height: 780,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  actualizacion = setInterval(buscarActualizacion, 5 * 60 * 1000) // para cambiar el tiempo del intervalo en minutos, modificar solo el primer 60
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})


ipcMain.handle('fotob64', async(event, args) =>{

  const base64Image = base64Img.base64Sync(args)
  return base64Image

})

// INSTALAR ACTUALIZACION

// ipcMain.on('instalar_actualizacion', (event, args)=>{
//   autoUpdater.quitAndInstall()
// })

// // --> EVENTO PARA BUSCAR Y MOSTRAR ACTUALIZACION

// ipcMain.on('get/version', (event, args) =>{
//   event.sender.send('version_app', {version: app.getVersion()})
//   buscarActualizacion()
// })

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
