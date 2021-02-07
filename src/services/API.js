import axios from "axios";

const API_KEY = '39267d69a225ed0c8fb27c0959311d7f';

export function getTopRated(page) {
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);

}

export function getGenreList() {
    return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);

}

export function createNewGuestSession() {
    return axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`);

}

export function submitNewRating(sessionId, ratingValue) {
    return axios.post('https://api.themoviedb.org/3/movie/761053/rating?api_key=39267d69a225ed0c8fb27c0959311d7f&guest_session_id=' + sessionId, { value: ratingValue });

}

export function getDetails(movieId) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
}

export function getCredits(movieId) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
}