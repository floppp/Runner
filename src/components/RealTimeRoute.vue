<template>
  <div class="page-container">
    <div id="rt-info-panel">
      <div id="rt-time-info" class="rt-display">
        <div class="rt-info-title">Tiempo</div>
        <div id="rt-time" class="rt-info">00:00:00</div>
      </div>
      <div id="rt-distance-info" class="rt-display">
        <div class="rt-info-title">Distancia</div>
        <div id="rt-distance" class="rt-info">0 m</div>
      </div>
      <div id="rt-velocity-info" class="rt-display">
        <div class="rt-info-title">Velocidad media</div>
        <div id="rt-velocity" class="rt-info">0 km/h</div>
      </div>
    </div>

    <div class="map" id="real-time-map"></div>

    <md-speed-dial class="md-bottom-right" md-event="click">
      <md-speed-dial-target id="btn-confirm"
                            class="md-primary"
                            @click="onAddClicked">
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">close</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button green-background" @click="onDoneClicked">
          <md-icon class="green-background">done</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>

    <md-dialog-prompt :md-active.sync="activeDialog"
                      v-model="title"
                      md-title="Introduzca nombre para la ruta finalizada"
                      md-input-maxlength="30"
                      md-input-placeholder="Título de la ruta"
                      md-confirm-text="Aceptar"
                      md-cancel-text="Cancelear"
                      @md-confirm="onDialogConfirmClicked" />
  </div>
</template>


<script>
  import APP_STATE     from '../models/state';
  import GoogleMapsApi from '../models/GoogleMapsApi';
  import mapsModule    from '../models/maps_module';
  import Position      from '../models/position';
  import Route         from '../models/route';


  export default {
    currentMarker: {},
    diff         : 1,
    id           : -1,
    polyline     : {},

    // No tengo claro porqué he de definir route de la forma reactiva de Vue. Si defino arriba, problemas
    // por undefined. He buscado pero no he encontrado la razón.
    data() {
      return {
        activeDialog: false,
        route       : [],
        title       : '',
      }
    },

    mounted() {
      const mapDom  = document.querySelector('#real-time-map');
      const gmapApi = new GoogleMapsApi('AIzaSyDo2f1x-MdrQspt7wKfElzB6XIlsTXWZiw');
      const options = {
        enableHighAccuracy: false,
        maximumAge        : 0,
        timeout           : 1000,
      };

      gmapApi.load().then(() => {
        const mapEl = mapsModule.renderMap(mapDom, { lat: 40, lng: -1 });

        this.polyline = new window.google.maps.Polyline({
          geodesic     : true,
          map          : mapEl,
          path         : [],
          strokeColor  : '#0000FF',
          strokeOpacity: 1.0,
          strokeWeight : 2,
        });

        this.id = navigator.geolocation.watchPosition(
          position => {
            const pos = new Position(
              position.coords.latitude,
              position.coords.longitude,
              position.coords.altitude,
              position.coords.speed,
            );
            this.route.push(pos);
            this.updatePosition(mapEl, pos);
            this.updateInfoPanels();
          },
          error => console.log(error),
          options
        );

        this.startTimer();
      })
    },

    beforeDestroy() {
      console.log('Limpiamos registro de navegación en RealTimeRoute.');
      navigator.geolocation.clearWatch(this.id);
    },

    methods: {
      /**
       * Actualización de los valores de distancia y de velocidad a partir de las posiciones.
       */
      updateInfoPanels: function() {
        const len = this.route.length;

        if (len > 2) {
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(this.route[len-1].lat, this.route[len-1].lng),
            new window.google.maps.LatLng(this.route[0].lat, this.route[0].lng)
          );
          document.querySelector('#rt-distance').innerHTML = `${(distance).toFixed(2)} m`;
          const kmh = distance / this.diff * 1000 * 3.6;
          document.querySelector('#rt-velocity').innerHTML = `${(kmh).toFixed(2)} km/h`;
        }
      },

      /**p
       * Actualización de la posición, obteniendo el path del polilyne y añadiéndole la nueva posición.
       * También actualizazamos el mapa y reubicamos el marker que nos indica la última posición
       * que hemos recibido.
       * @param map mapa de google donde estamos dibujando nuestra ruta
       * @param position posición con longitud y latitud detectada por el dispositivo
       */
      updatePosition: function(map, position) {
        this.polyline.setPath(this.route);

        if (this.currentMarker) {
          this.currentMarker.setPosition(position);
        } else {
          this.currentMarker = mapsModule.createMarker(map, position);
        }
        
        map.setCenter(position);
      },

      /**
       * Iniciamos el timer que controla el tiempo que estamos en ruta.
       */
      startTimer: function() {
        const twoDigits = n => `0${n}`.slice(-2);
        const timeDom   = document.querySelector('#rt-time');
        const startTime = new Date().getTime();
        const c1        = 1000 * 60 * 60;
        const c2        = 1000 * 60;

        setInterval(() => {
          const now     = new Date().getTime();
          this.diff     = now - startTime;
          const hours   = Math.floor((this.diff % (c1 * 24)) / c1);
          const minutes = Math.floor((this.diff % c1) / c2);
          const seconds = Math.floor((this.diff % c2) / 1000);

          timeDom.innerHTML = `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
        }, 1000);
      },

      onAddClicked() {
        const el = document.querySelector('#btn-confirm');
        if (el.classList.contains('md-accent')) {
          el.classList.remove('md-accent');
          el.classList.add('md-primary');
        } else {
          el.classList.add('md-accent');
          el.classList.remove('md-primary');
        }
      },

      onDoneClicked() {
        this.activeDialog = true;
      },

      onDialogConfirmClicked() {
        const id = APP_STATE.routes.length > 0 ? Math.max(...APP_STATE.routes.map(route => route.id)) + 1 : 0;
        APP_STATE.routes.push(new Route(id, this.route, this.title));
        localStorage.setItem('routes', JSON.stringify(APP_STATE.routes));

        this.$emit('hide-bar', true)
        this.$router.push('routes'); 
      }
    }
  }
</script>


<style>
  #rt-info-panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .rt-display {
    grid-column: span 1;
    display: flex;
    flex-direction: column;
  }

  .rt-info-title {
    color: gray;
    margin-bottom: 1em;
  }

  .rt-info {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 1em;
  }

  .map {
    height: 600px;
  }

  .md-bottom-right {
    bottom: 40px !important;
    right: 40px !important;
  }

  .green-background {
    background: green !important;
    color: white !important;
  }
</style>