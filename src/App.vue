<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{ appTitle }}</span>
      </md-app-toolbar>
      <md-app-content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.</p>
      </md-app-content>
    </md-app>
    <md-bottom-bar md-sync-route class="md-primary" >
      <md-bottom-bar-item to="/alarms" md-label="Home" md-icon="home"> </md-bottom-bar-item>
      <md-bottom-bar-item to="/tasks" md-label="Tasks" md-icon="list"> </md-bottom-bar-item>
      <md-bottom-bar-item to="/search" md-label="Search" md-icon="search"> </md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      appTitle: 'Routes'
    };
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
  /* height: 100vh; */
  padding-bottom: 56px;
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
