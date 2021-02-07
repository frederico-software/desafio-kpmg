<template>
  <v-container>
      <div class="small">
        <chart />
    </div>
  </v-container>
</template>

<script>
import Chart from './Chart.vue';
export default {
  components: { Chart },
  name: "Dashboard",

  data () {
      
    },

};
</script>

<style>
  .small {
    max-width: 400px;
    /* margin:  150px auto; */
  }
</style>
