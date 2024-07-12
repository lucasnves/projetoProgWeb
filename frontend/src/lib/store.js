import api from '../api';

export const loadAllMovies = async () => {
  const data = await api
    .get('api/movies/')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Erro ao buscar filmes:', error);
    });

    return data;
};

export const loadMovie = async (id) => {
  const data = await api
    .get(`api/movies/?id=${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Erro ao buscar filmes:', error);
    });

    return data[0];
}

export const filterMovies = async (filter) => {
  const movies = await loadAllMovies();
  if (!movies) return [];
  const filterMovies = [...movies].sort(
    (a, b) => b.average_stars - a.average_stars
  );
  return filterMovies;
}

export const loadAllRatings = async (id) => {
  const data = await api
    .get(`api/ratings/?movie_id=${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Erro ao buscar ratings:', error);
    });

    return data;
};
