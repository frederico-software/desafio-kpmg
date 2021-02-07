<template>
  <v-card class="elevation-5 flex d-flex flex-column" width="auto">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      width="auto"
      height="auto"
      :src="'https://image.tmdb.org/t/p/w185/' + movie.poster_path"
    ></v-img>

    <v-card-title>{{ movie.title }}</v-card-title>

    <v-card-text class="flex">
      <v-row align="center" class="ma-2">
        <v-rating
          :value="rating"
          @input="addRating($event, rating.id)"
          color="amber"
          dense
          half-increments
          size="10"
        ></v-rating>

        <div class="grey--text ml-4">
          {{ movie.vote_average }}
        </div>
      </v-row>
      <v-row align="center" class="mx-2"
        ><div class="my-2 subtitle-3">{{ genres }}</div></v-row
      >
      <v-row align="center" class="mx-2">
        <div class="my-2 subtitle-3">{{ actors }}</div>
      </v-row>
      <v-row align="center" class="mx-2">
        <div class="my-4 subtitle-3">Released: {{ movie.release_date }}</div>
      </v-row>
      <v-row align="center" justify="center">
        <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header> Overview </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <div class="my-1 subtitle-3">{{ movie.overview }}</div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      </v-row>
    </v-card-text>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-card>
</template>

<script>
import {
  createNewGuestSession,
  getCredits,
  getDetails,
  submitNewRating,
} from "../services/API";
export default {
  props: ["movie"],
  data: () => ({
    details: {},
    credits: {},
    actors: [],
    genres: [],
    rating: 0,
    text: "Movie rated successfully!",
    snackbar: false,
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getDetails(this.movie.id).then((response) => {
        this.details = response?.data;
        let genres = this.details?.genres;
        let temp = [];
        genres.forEach((element) => {
          temp.push(element.name);
        });
        this.genres = temp.join(", ");
      });

      getCredits(this.movie.id).then((creditsResponse) => {
        let credits = creditsResponse.data;
        let cast = [];
        for (let i = 0; i < 5; i++) {
          let element = credits.cast[i];
          cast.push(element.name);
        }
        this.actors = cast.join(", ");
      });
    },
    addRating(value, id) {
      this.rating = value;
      this.rate();
    },
    rate() {
      const createGuestSession = (callback) => {
        createNewGuestSession().then((response) => {
          if (response?.data?.success)
            callback(response?.data?.guest_session_id);
          console.log(response);
        });
      };

      const submitRating = (sessionId, ratingValue) => {
        submitNewRating(sessionId, ratingValue).then((response) => {
          this.snackbar = true;
        });
      };

      const newRating = (rating) => {
        createGuestSession((guestSessionId) => {
          submitRating(guestSessionId, rating);
        });
      };

      newRating(this.rating);
    },
  },
};
</script>