import { IonBadge, IonContent, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { getTopRated } from '../services/API';

export const MoviesList = (props) => {
    const [movies, setMovies] = React.useState([]);
    const history = useHistory();

    const sortTopMovies = (data) => {
        if (typeof data !== 'object') return;
        data.sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setMovies(data.slice(0, 100));
    }

    useEffect(() => {
        if (movies.length > 0) return;
        getTopRated().then(response => {
            if (!response || !response.data) return;
            sortTopMovies(response?.data?.results);
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
        < IonList >
            {getMovies()}
        </IonList >
    </ IonContent>
};