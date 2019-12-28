import Echarts from 'vue-echarts';
import Vue     from 'vue';

import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

Vue.component('echart', Echarts);