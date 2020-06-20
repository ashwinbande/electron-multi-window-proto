import Vue from 'vue';
import VueRouter from 'vue-router';
import loginView from '@/windows/login/views/loginView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: loginView,
    /* component() {
      return import(/!* webpackChunkName: "loginchunk" *!/ '../views/loginView.vue');
    }, */
  },
];

const router = new VueRouter({
  routes,
});

export default router;
