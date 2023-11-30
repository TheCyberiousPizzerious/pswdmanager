const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')

// Require things dont know if i need these here
const sqlite3 = require('sqlite3').verbose()

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    // Height controls
    show: true,
    width: 810,
    height: 600,
    minWidth: 800,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html');

  console.log(mainWindow)
  
  // I have no clue is this will break the code // It does
  //if (isDev) {
  //  mainWindow.webContents.openDevTools();
  //}
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  // dette er det som åpner filen
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


// I'm killing myself tonight
// Add IPC event handler for database creation
ipcMain.handle('create-database', async (event, dbName) => {
  const dbPath = path.join(app.getPath('userData'), `${dbName}.db`);
  const db = new sqlite3.Database(dbPath);

  // Stapp ting inni her

  db.close();

  return `Database '${dbName}.db' created successfully at '${dbPath}'`;
});