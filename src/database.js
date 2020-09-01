const mongoose = require('mongoose');
const { app, ipcMain } = require('electron');
const config = require('./config.json');
const { Users, Kurse } = require('./datasets/Models');
const bcrypt = require('bcrypt');

let connectionString = config.database.connection.replace('<password>', config.database.password_clean).replace('<dbname>', config.database.dbname);

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        //console.log(con);
    })
    .catch((error) => {
        console.log(error);
    });

ipcMain.on('database:find', (event, name) => {
    console.log(name);
    Users.findOne({ name: name }, (err, res) => {
        console.log(JSON.stringify(res));
        event.reply('database:senddata', res);
    });
});
