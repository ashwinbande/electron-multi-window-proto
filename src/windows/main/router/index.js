import Vue from 'vue';
import VueRouter from 'vue-router';
import dashboardView from '../views/dashboardView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: dashboardView,
    /* component() {
      return import(/!* webpackChunkName: "loginchunk" *!/ '../views/loginView.vue');
    }, */
  },
];

const router = new VueRouter({
  routes,
});

export default router;
