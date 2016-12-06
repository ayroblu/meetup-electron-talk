import { app, BrowserWindow, globalShortcut} from 'electron'

let mainWindow = null

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  const options = {
    width: 1000
  , height: 800
  , titleBarStyle: 'hidden'
  , frame: false,
  }
  mainWindow = new BrowserWindow(options)
  mainWindow.loadURL('file://' + __dirname + '/slides.html')
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('ready', () => {
  const ret = globalShortcut.register('CommandOrControl+Shift+H', ()=>{
    if (!mainWindow) return
    mainWindow.webContents.send('ping', 'whoooooooh!')
    mainWindow.focus()
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
