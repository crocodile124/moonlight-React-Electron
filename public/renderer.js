/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


const { clipboard, contextBridge, ipcMain, ipcRenderer, Menu, webFrame  } = require('electron');


const NOTIFICATION_TITLE = 'Title';
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.';
const CLICK_MESSAGE = 'Notification clicked!';


var ById = function (id) {
  return document.getElementById(id);
}



function processUser(user, callback) {
  if (user.name) {
    console.log(`Processing user ${user.name}...`);
    callback(null, { message: `User ${user.name} processed successfully.` });
  } else {
    callback(new Error('User name is required.'));
  }
}

ipcMain.on('application:dock-message-notification', function(event, id) {
  dockNotificationCache[id] = dockNotificationCache[id] + 1;
  if (process.platform === 'darwin' ||
    (process.platform === 'linux' && app.isUnityRunning &&
     app.isUnityRunning())) {
   app.setBadgeCount(dockNotificationCache[id]);
  }
  if (process.platform === 'darwin') {
   app.dock.bounce();
  }
 }); 
clipboard.writeText('Example string', 'selection')
console.log(clipboard.readText('selection'))


function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}

const menu = Menu.buildFromTemplate([
  {
      label: 'Restart electron app',
      type: 'normal',
      click() {
          app.relaunch();
          app.exit();
      },
  },
  {
      label: 'Quit electron app',
      accelerator: 'Cmd+Q',
      click() {
          app.quit();
      },
  },
])


function cancelRequest () {
  window.electronAPI.cancelBluetoothRequest()
}


async function testIt () {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true
  })
  document.getElementById('device-name').innerHTML = device.name || `ID: ${device.id}`
}
