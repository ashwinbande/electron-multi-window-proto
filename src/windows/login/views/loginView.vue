<template>
  <div>
    <h1>THIS IS LOGIN WINDOW</h1>
    <button type="button" @click="login">Login</button>
    <button type="button" @click="send">send</button>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-extraneous-dependencies
// const { ipcRenderer, remote } = require('electron');
//
// const electronStore = remote.getGlobal('electronStore');
import ElectronStore from '@/electronStore/renderer';

const electronStore = new ElectronStore();

export default {
  name: 'loginView',
  methods: {
    login() {
      const token = 'ASHWINBANDE';
      electronStore.set('token', token);
      ipcRenderer.send('start-main-window');
    },
    send() {
      electronStore.sendTo('mainWin', 'message', 'mew msg');
    },
  },
};
</script>

<style scoped>

</style>
