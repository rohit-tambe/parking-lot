<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        Parking Lot
      </div>
    </v-app-bar>

    <v-content>
      <ParkingLot/>
    </v-content>
  </v-app>
</template>

<script>
// import ParkingMuster from './components/ParkingMuster';
import ParkingLot from './components/ParkingLot';

export default {
  name: 'App',

  components: {
    // ParkingMuster,
    ParkingLot
  },
  data() {
    return {
    }
  },
  mounted() {
  },
};
</script>