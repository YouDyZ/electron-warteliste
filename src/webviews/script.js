const { webContents, ipcRenderer} = require("electron")

console.log("loaded")
document.getElementById("dom").innerHTML ="defer sucsessful"

ipcRenderer.on("testresponse", function(event, args) {
    console.log(args)
})

function sending () {
    console.log("Trying to send")
    ipcRenderer.send("testsend", "sending event");
}
