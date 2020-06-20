<template>
  <div>
    <h1>THIS IS LOGIN WINDOW</h1>
    <button type="button" @click="login">Login</button>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
// import { ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

export default {
  name: 'loginView',
  methods: {
    login() {
      console.log('login');
      const token = 'ASHWINBANDE';
      ipcRenderer.send('start-main-window', token);
    },
  },
};
</script>

<style scoped>

</style>
