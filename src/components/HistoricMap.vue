<template>
  <div id="historic-container" class="page-container">

    <div id="historic-info">
      <p id="historic-header-text">Representación de todas las rutas recorridas.</p>
      <p id="historic-sub-text">Haga click sobre la ruta que desee para saber más sobre ella.</p>
    </div>
    <div class="map" id="historic-map"></div>

  </div>
</template>


<script>
  import APP_STATE     from '../models/state';
  import GoogleMapsApi from '../models/GoogleMapsApi';
  import mapsModule    from '../models/maps_module';
  import { colors }    from '../models/utils';
  import googlekey     from '../environment';

  export default {
    mounted() {
      const mapDom  = document.querySelector('#historic-map');
      const gmapApi = new GoogleMapsApi(googlekey);
      const objRef  = this;

      gmapApi.load().then(() => {
        const mapEl = mapsModule.renderMap(mapDom, { lat: 40, lng: -1 }, 8);

        APP_STATE.routes.forEach(function(route, idx) {
          const pol = new window.google.maps.Polyline({
            geodesic     : true,
            map          : mapEl,
            path         : route.coordinates,
            strokeColor  : colors[idx],
            strokeOpacity: 1.0,
            strokeWeight : 2,
          });

          pol.addListener('click', () => {
            objRef.$router.push(`routedetails/${route.id}`);
            objRef.$emit('hide-bar', false);
            objRef.$emit('hide-bar-details', true);
          });
        })
        mapEl.setCenter(this.getCenter());
      })
    },

    methods: {
      /**
       * Método para calcular centro del mapa, a partir de las coordenadas de todas las rutas.
       * TODO: mejorar, en vez de suma y resta, sacar dos extremos que defina rectángulo que
       *       contiene todas las rutas y sacar el centro de dicho rectángulo como centro 
       *       del mapa.
       */
      getCenter() {
        const cs = APP_STATE.routes.reduce((acc, route) => {
          const vs = route.coordinates.reduce((acc1, position) => {
            acc1.lat1 += position.lat;
            acc1.lng1 += position.lng;

            return acc1;
          }, { lat1: 0, lng1: 0 });
          acc.lat += vs.lat1 / route.coordinates.length;
          acc.lng += vs.lng1 / route.coordinates.length;

          return acc;
        }, { lat: 0, lng: 0 });

        return { lat: cs.lat / APP_STATE.routes.length, lng: cs.lng / APP_STATE.routes.length }
      }
    }
  }
</script>


<style>
  #historic-container {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    height: calc(100% - 56px) !important;
  }

  #historic-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #historic-header-text {
    font-size: 1.4em;
  }

  #historic-sub-text {
    color: gray;
  }

  #historic-map {
    grid-row: span 4;
  }
</style>
