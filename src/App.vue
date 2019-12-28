<template>
  <div id="app">
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <md-button v-if="!isMainPageShown"
                   class="md-icon-button"
                   @click="onHomeClicked">
          <md-icon>keyboard_arrow_left</md-icon>
          <!-- <md-icon v-else-if="isShownDetails">satellite</md-icon> -->
        </md-button>
        <span class="md-title">{{ appTitle }}</span>
      </md-app-toolbar>
      <md-app-content>
        <md-dialog-confirm :md-active.sync="dialogActive"
                            md-title="Terminar la ruta?"
                            md-content="Esta acción cancelará la ruta seguida. Se perderán todos los datos registrados hasta ahora."
                            md-confirm-text="Confirmar"
                            md-cancel-text="Cancelear"
                            @md-confirm="onConfirm" />
        <router-view v-on:hide-bar="isMainPageShown = $event"
                     v-on:hide-bar-details="isShownDetails = $event" ></router-view>
      </md-app-content>
    </md-app>
    <md-bottom-bar v-if="isMainPageShown" md-sync-route class="md-primary" >
      <md-bottom-bar-item to="/home"   md-label="Home"   md-icon="home"> </md-bottom-bar-item>
      <md-bottom-bar-item to="/routes" md-label="Routes" md-icon="list"> </md-bottom-bar-item>
      <md-bottom-bar-item to="/map"    md-label="Map"    md-icon="satellite"> </md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
  import APP_STATE from './models/state';


  export default {
    name: 'app',

    data() {
      return {
        appTitle: 'Routes',
        isMainPageShown: true,
        isShownDetails: false,
        dialogActive: false
      };
    },

    mounted() {
      if (localStorage.getItem('routes')) {
        console.log('recuperando datos de localStorage');
        APP_STATE.routes = JSON.parse(localStorage.getItem('routes'));
      }
    },

    methods: {
      onHomeClicked() {
        if (!this.isShownDetails) {
          this.dialogActive = true;
        } else {
          this.onConfirm();
        }
      },

      onConfirm() {
        this.$router.go(-1);
        this.isMainPageShown = true;
        this.isShownDetails  = false;
      }
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    background-color: white;
  }

  .md-app {
    min-height: 100vh;
    max-height: 100vh;
  }

  /* .md-app-content {
    margin-bottom: 56px;
  } */

  .md-title {
    transition: 0.4s;
  }

  .md-bottom-bar {
    position: fixed;
    bottom: 0px;
    left: 0px;
  }

  .md-bottom-bar>.md-ripple {
    justify-content: center;
  }


</style>
