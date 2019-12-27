<template>
  <div id="details-container" class="page-container">
    <div id="details-title"> {{ title }} </div>

    <echart :options="chartOptions"></echart>
  </div>
</template>


<script>
  import APP_STATE     from '../models/state';


  export default {
    data() {
      return {
        chartOptions: {
          xAxis: {
            data: ["Q1", "Q2", "Q3", "Q4"]
          },
          yAxis: {
            type: "value"
          },
          tooltip: {

          },
          series: [
            {
              type: "line",
              data: [63, 75, 24, 92]
            }
          ],
          color: ["#127ac2"]
        },
        route: {},
        title: '',
      }
    },

    mounted() {
      this.route = APP_STATE.routes.filter(r => r.id === +this.$route.params.id)[0];
      this.title = this.route.title;
    }
  }
</script>


<style>
  #details-container {
    width: 100%;
    height: 300px;
  }

  .echarts {
    width: 100% !important;
    height: 100% !important;
  }

  .echarts > canvas {
    width: 100% !important;
    /* height: 100% !important; */
  }
</style>