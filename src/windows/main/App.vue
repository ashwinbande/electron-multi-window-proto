<template>
  <div id="app">
    <template v-if="token">
      <router-view/>
    </template>
    <template v-else>
      Unable to Load Token !
    </template>
  </div>
</template>

<script>
// const electronStore = remote.getGlobal('electronStore');
import ElectronStore from '@/electronStore/renderer';

const electronStore = new ElectronStore();

export default {
  name: 'app',
  data() {
    return {
      token: null,
    };
  },
  created() {
    // ipcRenderer.on('message', (e, token) => {
    //   console.log('electron_store_message', e, token);
    //   // this.token = token;
    // });
    electronStore.onReceiving('message', console.log);
    console.log(electronStore.get('token'));
    this.token = electronStore.get('token');
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
