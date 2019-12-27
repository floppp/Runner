<template>
  <md-card class="md-primary"
           md-theme="orange-card"
           md-with-hover >

    <md-card-header>
      <md-card-header-text>
        <div class="md-title"> {{ data.title }} </div>
        <div class="md-subhead"> {{ tsToDate(data.date) }} </div>
      </md-card-header-text>

      <md-menu md-size="big" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item @click="onDetailsClicked">
            <span>Detalles</span>
            <md-icon>info</md-icon>
          </md-menu-item>

          <md-menu-item @click="onEditRouteClicked">
            <span>Editar</span>
            <md-icon>edit</md-icon>
          </md-menu-item>

          <md-menu-item @click="onDeleteRouteClicked">
            <span>Eliminar</span>
            <md-icon>delete</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-card-header>

    <md-card-content>
      <route-info :time="data.time"
                  :distance="data.distance"
                  :kmh="data.kmh"></route-info>
    </md-card-content>
    
    <md-dialog-prompt :md-active.sync="activeDialog"
                      v-model="data.title"
                      md-title="Nuevo título?"
                      md-input-maxlength="30"
                      v-bind:md-input-placeholder="data.title"
                      md-confirm-text="Aceptar"
                      @md-confirm="onNewTitleClicked" />
  </md-card>
</template>

<script>
  import RouteInfo from './RouteInfo';

  export default {
    name: 'Route',
    components: {
      'route-info': RouteInfo
    },
    props: ['data'],

    data() {
      return {
        activeDialog: false,
      }
    },

    methods: {
      tsToDate: function() {
        const date = new Date(this.data.date);

        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },

      onDetailsClicked() {
        this.$router.push(`routedetails/${this.data.id}`);
        this.$emit('hide-bar', false);
        this.$emit('hide-bar-details', true);
      },

      onEditRouteClicked() {
        this.activeDialog = true;
      },

      onDeleteRouteClicked() {
        this.$emit('delete-route', this.data.id);
      },

      onNewTitleClicked() {
        this.$emit('save-localstorage');
      }
    }
  }
</script>

<style scoped>
  .md-menu-content-big {
    background-color: white !important;
  }

  .md-dialog {
    background-color: white !important;
  }
</style>
