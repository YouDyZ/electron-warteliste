const { ipcMain } = require('electron');
const mongoose = require('mongoose');
const { Users } = require('../../datasets/Models');
const bcrypt = require('bcrypt');
const config = require('./../../config.json');

ipcMain.on('login:checkdata', (event, loginname, loginpassword) => {
    loginpassword = JSON.stringify(loginpassword);
    Users.findOne({ name: loginname })
        //myStrongPW
        .then((res) => {
            console.log(`\bloginpassword: ${loginpassword} \b loginname: ${loginname}`);
            bcrypt.hash(loginpassword, res.salt).then((hash) => {
                if (hash === res.password) {
                    event.reply('login:matching');
                } else {
                    event.reply('login:notMatching');
                }
            });
        })
        .catch((err) => console.log(err));
});
