import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.config.productionTip = false;

import Home from './components/Home';
import Routes from './components/Routes';
import HistoricMap from './components/HistoricMap';

const routes = [
  { path: '/home',   component: Home },
  { path: '/routes', component: Routes },
  { path: '/map',    component: HistoricMap },
];

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
