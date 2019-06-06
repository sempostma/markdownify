const electron = require('electron');
const { app, BrowserWindow, Menu, dialog, ipcRenderer } = electron;
const path = require('path');
const fs = require('fs-extra');

const turndown = require('./turndown');
const { openFile, htmlExtensions, markdownExtensions, txtExtensions } = require('./files');



exports.createMenu = win => {
    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    click: () => {
                        dialog.showOpenDialog({
                            properties: ['openFile'],
                            filters: [
                                { name: 'Markdown', extensions: markdownExtensions },
                                { name: 'HTML', extensions: htmlExtensions },
                                { name: 'Text', extensions: txtExtensions },
                                { name: 'All', extensions: ['*'] },
                            ]
                        }, async (filePaths = []) => {
                            if (filePaths.length <= 0) return;
                            const [filename] = filePaths;

                            await openFile(win, filename);                            
                        })
                    }
                },
                {
                    label: 'Exit',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'Format',
            submenu: [
                {
                    label: 'Font',
                    click: () => {
                        win.webContents.send('app-state-change', { hideFontDialog: false });
                    }
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

