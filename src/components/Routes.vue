<template>
  <div class="page-container">
    <div v-if="!routes.length"> Sin rutas para mostrar </div>
    <md-field>
      <label>Búsqueda por nombre</label>
      <md-input v-model="searchedText"></md-input>
    </md-field>

    <route v-for="route in routes"
           :key="route.date"
           :data="route"
           v-on:hide-bar="$emit('hide-bar', $event)"
           v-on:hide-bar-details="$emit('hide-bar-details', $event)"
           v-on:delete-route="deleteRoute($event)"
           v-on:save-localstorage="saveLocalStorage"></route>
  </div>
</template>


<script>
  import APP_STATE from '../models/state';
  import Route     from './Route';

  export default {
    components: {
      'route': Route
    },


    data() {
      return {
        routes: APP_STATE.routes,
        searchedText: '',
      }
    },

    // Lo uso porque @change en md-input no consigo que funcione bien.
    watch: {
      searchedText: function () {
        this.routes = APP_STATE.routes.filter(r => this.fuzzyMatch(this.searchedText, r.title));
      }
    },

    methods: {
      searchedTextChanged(event) {
        console.log(event);
      },

      deleteRoute(routeId) {
        // Tal como está ahora esto no hace falta porque id === idx, pero por si acaso
        // cambia en un futuro y no tienen porqué ser iguales.
        const idx = APP_STATE.routes.indexOf(APP_STATE.routes.filter(r => r.id === routeId)[0]);
        APP_STATE.routes.splice(idx, 1);
        this.saveLocalStorage();
      },

      fuzzyMatch(pattern, str) {
        const re = new RegExp(`.*${pattern.split('').join('.*')}.*`);

        return re.test(str);
      },

      saveLocalStorage() {
        localStorage.setItem('routes', JSON.stringify(APP_STATE.routes));
      }
    }
  }
</script>


<style>
  .md-card {
    margin-bottom: 2em;
  }

  .md-field {
    width: auto !important;
    margin: 4px 16px 24px 16px !important;
    text-align-last: right;
  }

  .md-field label {
    right: 0 !important;
    left:auto !important;
  }
</style>