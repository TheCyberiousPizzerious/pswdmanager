// Importing needed modules
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const sqlite3 = require('sqlite3').verbose(); // Require things dont know if i need these here
//const path = require('path')

// Some build things from the site
if (require('electron-squirrel-startup')) {
  app.quit();
}

//Obsolete as it comunicates with preload
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
    minHeight: 500,
    //Options
    webPreferences: {
      nodeIntegration: true, //Allows render scripts to use modules
      contextIsolation: false //Allows to use modules outside of preload and main
      //preload: path.join(__dirname, 'preload.js') //Preload script loader
    }
  })
  mainWindow.loadFile('src/index.html'); // HTML file to load

  //mainWindow.webContents.openDevTools(); // Auto open devtools

};
app.on('ready', createWindow); // When everything is loaded make the window

ipcMain.on('open-file', async (event, result) => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select a File',
      defaultPath: '~/password.db',
      buttonLabel: 'Open',
      properties: ['openFile'], // Specifies that it is only one file that should be selected
      filters: [{ name: 'SQLite Databases', extensions: ['db'] }] // Only.db files can be opened
    });

    if (!result.canceled && result.filePaths.length > 0) { // if not canceled and making sure only one file has been selected
      event.sender.send('file-selected', result.filePaths[0]) // Send message and file selected
      console.log(result.filePath)
    } else {
      event.sender.send('open-canceled'); // Just sends something to send something
    }
  } catch (err) {
    event.sender.send(err)
    console.error(err); // if err show err
  };
});

ipcMain.on('save-file', async (event, result) => { // Waits for 'save-file'
  try {
    const result = await dialog.showSaveDialog(mainWindow, { // wait for user to select
      title: 'Select File Location',
      defaultPath: app.getPath('documents'),
      buttonLabel: 'Save',
      filters: [{name: 'Database', extensions: ['db']}]
    })
    if (!result.canceled) { // if not canceled send the locations and thins
      event.sender.send('location-chosen', result.filePath);
    } else {
      event.sender.send('open-canceled')
    }
  } catch (err) {
    event.sender.send(err)
    console.error(err)
  }
}) 