<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button v-if="!isMainPageShown"
                   class="md-icon-button"
                   @click="onHomeClicked">
          <md-icon>home</md-icon>
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
        <router-view v-on:hide-bar="isMainPageShown = $event"></router-view>
      </md-app-content>
    </md-app>
    <md-bottom-bar v-if="isMainPageShown" md-sync-route class="md-primary" >
      <md-bottom-bar-item to="/home" md-label="Home" md-icon="home"> </md-bottom-bar-item>
      <md-bottom-bar-item to="/routes" md-label="Routes" md-icon="list"> </md-bottom-bar-item>
      <md-bottom-bar-item to="/map" md-label="Map" md-icon="search"> </md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      appTitle: 'Routes',
      isMainPageShown: true,
      dialogActive: false
    };
  },

  methods: {
    onHomeClicked() {
      this.dialogActive = true;
    },

    onConfirm() {
      this.$router.push('home'); 
      this.isMainPageShown = true
    }
  }
};
</script>

<style lang="css">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    background-color: white;
  }

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
