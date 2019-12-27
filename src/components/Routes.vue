<template>
  <div class="page-container">
    <div v-if="routes.length == 0"> Sin rutas para mostrar </div>
    <route v-for="route in routes"
           :key="route.date"
           :data="route"
           v-on:hide-bar="$emit('hide-bar', $event)"
           v-on:hide-bar-details="$emit('hide-bar-details', $event)"
           v-on:delete-route="deleteRoute($event)"></route>
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
        routes: APP_STATE.routes
      }
    },

    methods: {
      deleteRoute(routeId) {
        // Tal como está ahora esto no hace falta, id === idx, pero por si acaso cambia en un
        // futuro y no tienen porqué ser iguales.
        const idx = APP_STATE.routes.indexOf(APP_STATE.routes.filter(r => r.id === routeId)[0]);
        APP_STATE.routes.splice(idx, 1);
        localStorage.setItem('routes', JSON.stringify(APP_STATE.routes));
      }
    }
  }
</script>


<style>
  .md-card {
    margin-bottom: 2em;
  }
</style>