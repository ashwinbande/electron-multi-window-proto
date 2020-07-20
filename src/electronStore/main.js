export default class ElectronStore {
  constructor() {
    const storeIsPresent = Object.prototype.hasOwnProperty.call(global, 'electronStore');
    if (storeIsPresent) {
      console.warn('store was already declared earlier!'
        + ' no new store created. returning older store');
      return global.electronStore;
    }
    this.store = {};
    this.windows = {};
    global.electronStore = this;
  }

  get(key) {
    const keyIsPresent = Object.prototype.hasOwnProperty.call(this.store, key);
    if (keyIsPresent) return this.store[key];
    console.warn(`key '${key}' is not set in store but accessed!
     returning undefined instead.`);
    return undefined;
  }

  set(key, value, replace = false) {
    const keyIsPresent = Object.prototype.hasOwnProperty.call(this.store, key);
    if (!keyIsPresent) this.store[key] = value;
    else if (keyIsPresent && replace) this.store[key] = value;
    else if (keyIsPresent && !replace) {
      console.error(`key ${key} is already present in store;
       to replace its value set parameter 'replace' to true.`);
    }
  }

  remove(key) {
    const keyIsPresent = Object.prototype.hasOwnProperty.call(this.store, key);
    if (keyIsPresent) delete this.store[key];
    else console.warn(`Key ${key} was not present in store; but tried to be deleted!`);
  }

  register(name, window) {
    const windowIsPresent = Object.prototype.hasOwnProperty.call(this.windows, name)
      && !!this.windows[name];
    if (windowIsPresent) console.error(`Window '${name}' is already present!`);
    else this.windows[name] = window;
  }

  // sendTo(window, channel, payload) {
  //   // const { id } = this.windows[name].webContents;
  //   // ipcRenderer.sendTo(id, 'electron_store_message', payload);
  //   this.windows[window].webContents.send(channel, payload);
  // }

  getWindowID(name) {
    const windowIsPresent = Object.prototype.hasOwnProperty.call(this.windows, name)
      && !!this.windows[name];
    if (windowIsPresent) return this.windows[name].webContents.id;
    console.warn(`Window '${name}' is not present! returning undefined instead.`);
    return undefined;
  }
}
