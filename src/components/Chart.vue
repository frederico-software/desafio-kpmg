<script>
import { Bar } from "vue-chartjs";
import { getGenreList, getTopRated } from '../services/API';

export default {
  extends: Bar,
  data() {
      return {
          quantity: {},
          genres: [],
          chartData: {}
      }
  },
  methods: {
      populateData (loadedGenres) {
        let newData = {
            labels: [],
            datasets: {
                data: []
            }
        };

        newData.labels = [];
        newData.datasets.data = [];
        loadedGenres.forEach(item => {
            newData.labels.push(item.name);
            newData.datasets.data.push(this.quantity[item.id]);
        });

        this.chartData = {
            labels: newData.labels,
            datasets: [
              {
                label: 'Number of movies by genre',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: newData.datasets.data
              }
            ]
          };
          this.renderChart(this.chartData);
       },
       countGenres (loadedGenres) {
        
        getTopRated().then(topRatedData => {
            if(!topRatedData) return;
            let ratedData = topRatedData.data.results;
            ratedData.forEach(item => {
                for(let i=0; i< item.genre_ids.length; i++) {
                    this.quantity[item.genre_ids[i]] = this.quantity[item.genre_ids[i]] + 1;
                }
            });
            this.populateData(loadedGenres);
        });
      }
  },
  mounted() {
      getGenreList().then(response => {
            this.genres = (response?.data.genres);
            // console.log(genres);
            response?.data.genres.forEach(item => {
                this.quantity[item.id] = 0;
            });
            this.countGenres(response?.data.genres);
        });
  },
};
</script>