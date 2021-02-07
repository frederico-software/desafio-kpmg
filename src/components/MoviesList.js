import { IonBadge, IonContent, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import { default as axios, default as Axios } from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { getTopRated } from '../services/API';

export const MoviesList = (props) => {
    const [movies, setMovies] = React.useState([]);
    // const [genres, setGenres] = React.useState([]);
    const [mostFrequentGenre, setMostFrequentGenre] = React.useState('');
    const [rarestGenre, setRarestGenre] = React.useState('');
    const history = useHistory();
    // let show = false;

    // const getMostFrequentItem = (arr) => {
    //     return arr.sort((a, b) =>
    //         arr.filter(v => v === a).length
    //         - arr.filter(v => v === b).length
    //     ).pop();
    // };

    // const getRarestItem = (array) => {
    //     const result = [...array.reduce((r, n) => // create a map of occurrences
    //         r.set(n, (r.get(n) || 0) + 1), new Map()
    //     )]
    //         .reduce((r, v) => v[1] < r[1] ? v : r)[0]; // get the the item that appear less times
    //     return result;
    // };

    const sortTopMovies = (data) => {
        if(typeof data !== 'object') return;
        data.sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setMovies(data.slice(0, 100));
        // console.log(data);
    }

    useEffect(() => {
        if (movies.length > 0) return;
        getTopRated().then(response => {
            if (!response || !response.data) return;
            sortTopMovies(response?.data?.results);

            // temp = [];
            // temp2.forEach(item => {
            //     if (!item) return;
            //     for (let i = 0; i < item.genre_ids.length; i++)
            //         temp.push(item.genre_ids[i]);
            // });
            // // setGenres(temp);
            // let mostFrequent = getMostFrequentItem(temp)
            // let rarest = getRarestItem(temp);
            // axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=39267d69a225ed0c8fb27c0959311d7f&language=en-US').then(response => {
            //     let genres = response?.data?.genres;
            //     console.log(genres)
            //     for (let i = 0; i < genres.length; i++) {
            //         if (genres[i].id == rarest)
            //             setRarestGenre(genres[i].name)

            //         if (genres[i].id == mostFrequent)
            //             setMostFrequentGenre(genres[i].name)
            //     }
            //     console.log(rarestGenre);
            // });
        });


    }, [movies]);

    const showDetails = (item) => {
        history.push('/details', { item });
    };

    const getMovies = () => {
        return movies.map((item, index) => {
            if (!item) return;
            return <>
                <IonItem key={index} onClick={() => { showDetails(item) }}>
                    <IonThumbnail slot="start">
                        <img src={'https://image.tmdb.org/t/p/w185/' + item['poster_path']} />
                    </IonThumbnail>
                    <IonLabel><h2>{item['title']}</h2>
                        <p>{item['overview']}</p>
                    </IonLabel>
                    <IonBadge color="primary">{item?.vote_average}</IonBadge>
                </IonItem></>
        })
    }

    return < IonContent >
        {/* <p>Rarest genre: {rarestGenre}</p>
        <p>Most Frequent genre: {mostFrequentGenre}</p> */}
        < IonList >
            {getMovies()}
        </IonList >
    </ IonContent>
};