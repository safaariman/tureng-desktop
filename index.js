const electron = require('electron');
const path = require('path');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');

var splashScreen = null;
var mainWindow = null;

function read_ui_settings () {
    var settings = fs.readFileSync(__dirname + '/settings/settings.json', 'utf8');
    return JSON.parse(settings);
}

function init_settings () {
    var settings = read_ui_settings();
    global.tureng_ui_settings = settings.tureng_ui_settings;
}

function init_windows () {
    var splashScreenOptions = {
        width: 300,
        transparent: true,
        minWidth: 300,
        height: 200,
        frame: false,
        resizable: false,
        title: app.getName(),
        icon: path.join(__dirname, '/assets/icons/tureng.png'),
        show: false,
        type: BrowserWindow.splash
    };

    var mainWindowOptions = {
        width: 750,
        transparent: true,
        minWidth: 750,
        height: 480,
        frame: true,
        resizable: true,
        title: app.getName(),
        icon: path.join(__dirname, '/assets/icons/tureng.png'),
        show: false
    };

    splashScreen = new BrowserWindow(splashScreenOptions);
    mainWindow = new BrowserWindow(mainWindowOptions);

    splashScreen.loadURL(path.join('file://', __dirname, '/window/splash.html'));
    mainWindow.loadURL(path.join('file://', __dirname, '/window/index.html'));

    splashScreen.on('closed', function () {
        splashScreen = null;
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function show_splash () {
    splashScreen.show();
    setTimeout(function () {
        splashScreen.close();
        // mainWindow.openDevTools()
        mainWindow.show()
    }, 3000);
}

function pass_splash () {
    splashScreen.close();
    mainWindow.openDevTools();
    mainWindow.show();
}

var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

if (shouldQuit) {
    app.quit();
    return;
}

app.on('ready', function () {
    init_settings()
    init_windows();
    // show_splash();
    pass_splash();
});

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// app.on('browser-window-blur', function () {
//    app.quit();
// });