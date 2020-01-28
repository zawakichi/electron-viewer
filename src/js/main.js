'use strict';

// Electronのモジュール
const electron = require('electron');

const { ipcMain } = require('electron');


const url = require('url');
const path = require('path');
const ReadFile = require('./readfile');


// アプリケーションをコントロールするモジュール
const app = electron.app;
// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;
// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

const _readFile = new ReadFile();
const htmlDir = "C:\\\work/streetview-electron/src/html/";


// 全てのウィンドウが閉じたら終了
app.on( 'window-all-closed', function() {
    if ( process.platform != 'darwin' ) {
        app.quit();
    }
} );

// Electronの初期化完了後に実行
app.on( 'ready', () => {
    // メイン画面の表示。ウィンドウの幅、高さを指定できる
    mainWindow = new BrowserWindow( { 
        width: 1000,
        height: 700,
        useContentSize: true
    } );
    mainWindow.setMenu(null);
    mainWindow.loadFile(htmlDir + 'index.html');

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on( 'closed', function() {
        mainWindow = null;
    } );
    
    ipcMain.on('message', (event, arg) => {
        console.log(arg)
        event.sender.send('reply', 'pong');
    } );

    
} );