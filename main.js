let { app, BrowserWindow } = require('electron');


let win;

// 4e007221c77142a096f222223210a44a

app.on('ready', () => {
    win = new BrowserWindow({
        width:800,
        height:500,
        webPreferences : {
            nodeIntegration:true
        }
    });
    win.loadFile('index.html');
});