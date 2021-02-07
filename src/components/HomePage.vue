<template>
  <v-container>
    <v-card>
      <v-toolbar color="black" dark flat>
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

        <v-toolbar-title>Movie App</v-toolbar-title>

        <!-- <v-spacer></v-spacer> -->

        <!-- <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->

        <!-- <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->

        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
              <dashboard />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
              <movies-list />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
              <about />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Dashboard from './Dashboard.vue';
import MoviesList from './MoviesList.vue';
import About from './AboutPage.vue';

export default {
  components: { Dashboard, MoviesList, About },
  name: "HelloWorld",

  data () {
      return {
        tab: null,
        items: [
          'Dashboard', 'Movies', 'About this App'
        ]
      }
    },

};
</script>
