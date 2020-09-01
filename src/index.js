const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const config = require('./config.json');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: false,
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (config.finished != true) {
        mainWindow.loadFile(path.join(__dirname, 'webviews/config.html'));
    } else {
        mainWindow.loadFile(path.join(__dirname, 'webviews/index.html'));
    }

    mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

//connect to Database
require('./database');

//adding events
require('./mainEvents/events');
