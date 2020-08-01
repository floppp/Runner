<template>
  <div id="details-container" class="page-container">
    <div id="details-title"> {{ title }} </div>

    <echart :options="options"></echart>

    <route-info :time="route.time"
                :distance="route.distance"
                :kmh="route.kmh"></route-info>

    <div class="map" id="route-details-map"></div>

  </div>
</template>


<script>
  import APP_STATE     from '../models/state';
  import GoogleMapsApi from '../models/GoogleMapsApi';
  import mapsModule    from '../models/maps_module';
  import RouteInfo     from './RouteInfo';
  import googleapi     from '../environment';
  export default {
    name: 'RouteDetails',

    components: {
      'route-info': RouteInfo
    },

    data() {
      return {
        options : {},
        route   : {},
        title   : '',
        xValues : [],
        yValues : [],
      }
    },

    mounted() {
      this.route   = APP_STATE.routes.filter(r => r.id === +this.$route.params.id)[0];
      this.title   = this.route.title;
      this.options = this.getOptions();
      
      const mapDom  = document.querySelector('#route-details-map');
      const gmapApi = new GoogleMapsApi(googlepi);
      const objRef  = this;

      gmapApi.load().then(() => {
        const mapEl = mapsModule.renderMap(mapDom, { lat: 40, lng: -1 }, 12);

        const pol = new window.google.maps.Polyline({
          geodesic      : true,
          map           : mapEl,
          path          : this.route.coordinates,
          strokeColor   : '#ff0000',
          strokeOpacity : 1.0,
          strokeWeight  : 2,
        });
        console.log(this.route);
        mapEl.setCenter(this.route.center);
      })
    },

    methods: {
      getOptions() {
        return {
          legend: {
            data : ['km/h', 'min/km'],
            x    : 'center'
          },
          grid: {
            bottom: 30,
            // left: '20%',
            // right: '20%',
            // bottom: '20%',
            // containLabel: true
          },
          xAxis: {
            name: 'avance (m)',
            data: this.route.coordinates.reduce((acc, pos) => {
              return acc.concat(acc.slice(-1)[0] + pos.distance)
            }, [0]).map(v => v.toFixed(0)),
            nameLocation: 'middle',
            nameGap: 20
          },
          yAxis: [
            {
              type: 'value',
              name: 'valocidad (km/h)',
              splitLine: {
                show: false
              },
              // nameLocation: 'middle',
              // nameGap: 50
            },
            {
              type: 'value',
              name: 'ritmo (min/km)',
              // nameLocation: 'middle',
              // nameGap: 50
            }
          ],
          tooltip: {
            trigger: 'axis',
          },
          series: [
            {
              name : 'km/h',
              type : 'line',
              yAxisIndex: 0,
              data : this.route.coordinates.map(pos => pos.kmh)
            },
            {
              name : 'min/km',
              type : 'line',
              yAxisIndex: 1,
              data : this.route.coordinates.map(pos => pos.minkm)
            }
          ],
          color: ["#127ac2", '#ab0c93']
        }
      }
    }
  }
</script>


<style>
  #details-container {
    display: grid;
    grid-template-rows: 48px repeat(10, 1fr);
    height: 100%;
  }

  #details-title {
    font-size: 1.5em;
    font-style: italic;
    font-weight: 600;
    font-family: serif;
    margin-top: 0.5em;
  }

  .echarts {
    width: 100% !important;
    height: 100% !important;
    grid-row: span 4;
  }

  .echarts > canvas {
    width: 100% !important;
  }

  #route-details-map {
    grid-row: span 5;
  }
</style>
