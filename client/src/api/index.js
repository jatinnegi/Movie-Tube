import axios from "axios";

// const baseURL = "http://localhost:5000/api";
const baseURL = "https://mern-movie-app-tmdb.herokuapp.com/api";

const api = axios.create({
  baseURL,
});

export const getTrending = (limit) => api.get(`/trending?limit=${limit}`);
export const getPopularMovies = (limit) =>
  api.get(`/popular/movies?limit=${limit}`);
export const getPopularTv = (limit) => api.get(`/popular/tv?limit=${limit}`);
export const getAutocomplete = (query) =>
  api.get(`/autocomplete?query=${query}`);
export const getGenresList = () => api.get("/genresList");
export const getGenreMedia = (genreName, mediaType, sortBy, page) =>
  api.get(`/genre/${genreName}/${mediaType}?sort_by=${sortBy}&page=${page}`);
export const getMediaDetails = (mediaType, mediaId) =>
  api.get(`/${mediaType}/${mediaId}`);
export const getSeasonsList = (id) => api.get(`/tv/${id}/seasons`);
export const getTotalSeasons = (id) => api.get(`/tv/${id}/seasons/total`);
export const getEpisodesList = (id, seasonNumber) =>
  api.get(`/tv/${id}/seasons/${seasonNumber}`);
