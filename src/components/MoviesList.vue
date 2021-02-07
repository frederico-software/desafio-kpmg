<template>
  <v-container>
    <!-- <div class="d-flex flex-row flex-wrap mb-12"> -->
    <v-row>
      <v-col class="pa-3 d-flex flex-column" v-for="item of movies" :key="item.id">
        <movie-card :movie="item" />
      </v-col>
    </v-row>
    <!-- </div> -->
    
  </v-container>
</template>

<script>
import MovieCard from "./MovieCard.vue";
import { getTopRated } from "../services/API";
export default {
  components: { MovieCard },
  name: "MoviesList",
  methods: {
    init() {
        let topRated = [];
        for(let i = 1; i <=5; i++) {
            getTopRated(i).then((response) => {
                if (!response || !response.data) return;
                topRated.push(...response?.data?.results);
            });
        }
        this.sortTopMovies(topRated);
    //   getTopRated(1).then((response) => {
    //     if (!response || !response.data) return;
    //     this.sortTopMovies(response?.data?.results);
    //   });
    },
    sortTopMovies(data) {
      if (typeof data !== "object") return;
      data.sort((a, b) => (a.vote_average < b.vote_average ? 1 : -1));
      this.setMovies(data) //.slice(0, 100));
    },
    setMovies(movies) {
      console.log(movies);
      this.movies = movies;
    },
    showDialog(item) {
      this.currentMovie = item;
      this.dialog = true;
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      movies: [],
      dialog: false,
      currentMovie: null,
    };
  },
};
</script>
