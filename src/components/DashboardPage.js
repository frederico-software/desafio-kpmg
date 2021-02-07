import { IonCard, IonCardContent, IonContent, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getGenreList, getTopRated } from '../services/API';

const DashboardPage = () => {
  const [genres, setGenres] = React.useState([]);

  const [data, setData] = React.useState({
    labels: [],
    datasets: [
      {
        label: 'Number of movies by genre',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
      }
    ]
  });
  let quantity = {};



  const populateData = (loadedGenres) => {
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
      newData.datasets.data.push(quantity[item.id]);
    });
    setData({
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
    })
  };

  const countGenres = (loadedGenres) => {

    getTopRated().then(topRatedData => {
      if (!topRatedData) return;
      let ratedData = topRatedData.data.results;
      ratedData.forEach(item => {
        for (let i = 0; i < item.genre_ids.length; i++) {
          quantity[item.genre_ids[i]] = quantity[item.genre_ids[i]] + 1;
        }
      });
      populateData(loadedGenres);
    });
  };

  useEffect(() => {
    if (genres.length > 0) return;
    getGenreList().then(response => {
      setGenres(response?.data.genres);
      response?.data.genres.forEach(item => {
        quantity[item.id] = 0;
      });
      countGenres(response?.data.genres);
    });
  }, [data]);


  return (
    <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
      <h2>Number of movies by genre</h2>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true
        }}
      />
    </div>
  );
};

export default DashboardPage;
