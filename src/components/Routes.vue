<template>
  <div class="page-container">
    <route v-for="route in routes"
           :key="route.date"
           :data="route"></Route>
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
  } 
}
</script>


<style lang="stylus">
</style>