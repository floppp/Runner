<template>
  <div class="page-container">
    <div class="md-title">Ubicación actual</div>
    <div class="map" id="home-map"></div>
    <md-button class="md-raised md-primary" @click="$emit('hide-bar', false); $router.push('realtimeroute')">
      <md-icon>add</md-icon> Empezar ruta
    </md-button>
  </div>
</template>

<script>
  import GoogleMapsApi from '../models/GoogleMapsApi';
  import mapsModule    from '../models/maps_module';

  export default {
    props: ['title'],
    
    // Private, non-reactive.
    currentMarker: {},
    id: -1,

    mounted() {
      const mapDom = document.querySelector('#home-map');
      const gmapApi = new GoogleMapsApi('AIzaSyDo2f1x-MdrQspt7wKfElzB6XIlsTXWZiw');
      gmapApi.load().then(() => {
        const mapEl = mapsModule.renderMap(mapDom, {lat: 40, lng: -1});
        this.id = navigator.geolocation.watchPosition(
          position => {
            this.updatePosition(mapEl, {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
          },
          error => { console.log(error); },
        )
      })
    },

    beforeDestroy() {
      console.log('Limpiamos registro de navegación en Home.');
      navigator.geolocation.clearWatch(this.id);
    },

    /**
     * Actualización del marker con nuestra posición actual, y centrado del mapa en el mismo.
     * @param map mapa de google donde estamos dibujando nuestra ruta
     * @param position posición con longitud y latitud detectada por el dispositivo
     */
    methods: {
      updatePosition: function(map, position) {
        if (this.currentMarker) {
          this.currentMarker.setPosition(position);
        } else {
          this.currentMarker = mapsModule.createMarker(map, position);
        }
        map.setCenter(position);
      }
    }
  }
</script>

<style scoped>
  .md-title {
    font-size: 1.5em;
    font-weight: 700;
    padding: 0.5em;
  }

  .map {
    height: 500px;
    margin-bottom: 1.5em;
  }

  button {
    border-radius: 2%;
  }

</style>