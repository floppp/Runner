<template>
  <md-card class="md-primary" md-theme="orange-card" md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title"> {{ data.title }} </div>
        <div class="md-subhead"> {{ data.date }} </div>
      </md-card-header>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
      </md-card-content>
    </md-ripple>
  </md-card>
</template>

<script>
  export default {
    name: 'Route',

    props: ['data'],

    methods: {
      formatDate: function() {
        return this.data.date.getDate() + '/' +
        (this.data.date.getMonth() + 1) + '/' +
        this.data.date.getYear();
      }
    }
  }
</script>
