<template>
<v-app>
<home-page/>
</v-app>

</template>

<script>
import HomePage from './components/HomePage.vue';

export default {
  name: 'App',

  components: {
    HomePage,
  },

  data: () => ({
    //
  }),
};
</script>
