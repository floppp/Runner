<template>
    <div class="page-content">
      <div class="route-info-container">
        <div class="ri-display">
          <div class="ri-info-title">Tiempo</div>
          <div class="ri-info"> {{ tsToTime(time) }} </div>
        </div>
        <div class="ri-display">
          <div class="ri-info-title">Distancia</div>
          <div class="ri-info"> {{ distance.toFixed(2) }} m </div>
        </div>
        <div class="ri-display">
          <div class="ri-info-title">Velocidad</div>
          <div class="ri-info"> {{ kmh.toFixed(2) }} kmh </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['time', 'distance', 'kmh'],

    methods: {
      tsToTime(ts) {
        const twoDigits = n => `0${n}`.slice(-2);

        const c1 = 1000 * 60 * 60;
        const c2 = 1000 * 60;
        const hours   = Math.floor((ts % (c1 * 24)) / c1);
        const minutes = Math.floor((ts % c1) / c2);
        const seconds = Math.floor((ts % c2) / 1000);

        return `${twoDigits(hours)}h ${twoDigits(minutes)}' ${twoDigits(seconds)}"`;
      }
    }
  }
</script>


<style >
  .route-info-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .ri-info-title {
    font-style: italic;
    font-size: 0.9em;
  }

  .ri-info {
    font-size: 1.1em;
    font-weight: bold;
  }
</style>