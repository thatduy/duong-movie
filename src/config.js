export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "0f4c8b3bf29006a865b10eb5ec71205c";

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (Id) => `${tmdbEndpoint}/${Id}?api_key=${apiKey}`,
  getMovieTotalType: (Id, type) =>
    `${tmdbEndpoint}/${Id}/${type}?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
};
