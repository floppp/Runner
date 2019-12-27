import Vue           from 'vue';
import App           from './App.vue';
import VueRouter     from 'vue-router';
import VueMaterial   from 'vue-material'
import Home          from './components/Home';
import Routes        from './components/Routes';
import HistoricMap   from './components/HistoricMap';
import RouteDetails  from './components/RouteDetails';
import RealTimeRoute from './components/RealTimeRoute';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '@/models/echarts';

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: '/home',              component: Home },
  { path: '/realtimeroute',     component: RealTimeRoute },
  { path: '/routes',            component: Routes },
  { path: '/map',               component: HistoricMap },
  { path: '/routedetails/:id', component: RouteDetails },
  { path: '/*',                 component: Home },
];

const router = new VueRouter({ routes });

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
