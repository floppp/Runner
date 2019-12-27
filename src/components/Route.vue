<template>
  <md-card class="md-primary"
           md-theme="orange-card"
           md-with-hover >
    <!-- <md-ripple> -->
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
      </md-card-content>
    <!-- </md-ripple> -->
  </md-card>
</template>

<script>
  export default {
    name: 'Route',

    props: ['data'],

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

      },

      onDeleteRouteClicked() {
        this.$emit('delete-route', this.data.id);
      }
    }
  }
</script>

<style scoped>
  .md-menu-content-big {
    background-color: white !important;
  }
</style>
