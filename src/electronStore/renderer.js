// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer, remote } = require('electron');

export default class RendererAccess {
  constructor() {
    const mainStore = remote.getGlobal('electronStore');
    if (!mainStore) console.error('Unable to find store in Main process!');
    this.mainStore = mainStore;
  }

  get(key) {
    return this.mainStore.get(key);
  }

  set(key, value, replace = false) {
    this.mainStore.set(key, value, replace);
  }

  remove(key) {
    this.mainStore.remove(key);
  }

  // eslint-disable-next-line class-methods-use-this
  onReceiving(channel, callback) {
    ipcRenderer.on(channel, callback);
  }

  sendTo(window, channel, payload) {
    const id = this.mainStore.getWindowID(window);
    if (id) {
      ipcRenderer.sendTo(id, channel, payload);
    } else console.error(`Unable find window ${window}`);
  }
}
