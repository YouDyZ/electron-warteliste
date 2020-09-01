const { ipcRenderer } = require('electron');

function login() {
    const loginUsername = document.getElementById('login_username');
    const loginPassword = document.getElementById('login_password');

    //checking for error
    let isMissing = false;
    if (loginUsername.value == '') {
        loginUsername.classList.add('input_missing');
        document.getElementById('errorField').innerHTML = '<span class="generatedError"> Bitte gebe dein Loginname ein!</span></br>';
        isMissing = true;
    }
    if (loginPassword.value == '') {
        loginPassword.classList.add('input_missing');
        document.getElementById('errorField').innerHTML += '<span class="generatedError">Bitte gebe dein Passwort ein!<span><br>';
        isMissing = true;
    }
    if (isMissing) {
        return;
    }

    ipcRenderer.send('login:checkdata', `${loginUsername.value}`, `${loginPassword.value}`);
}

//LOADING EVENTS
ipcRenderer.on('login:matching', (event) => {
    const loginUsername = document.getElementById('login_username');
    const loginPassword = document.getElementById('login_password');

    loginUsername.classList.remove('input_missing');
    loginPassword.classList.remove('input_missing');

    console.log('Matching!!!!');
    event.send('login:finish');
});

ipcRenderer.on('login:notmatching', (event) => {
    const loginUsername = document.getElementById('login_username');
    const loginPassword = document.getElementById('login_password');

    loginPassword.classList.add('input_missing');
});
