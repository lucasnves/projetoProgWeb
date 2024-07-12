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
};

export const filterMovies = async (filter, searchTerm = '') => {
  try {
    let url = 'api/movies/filter/?filter=' + filter;
    if (filter === 'name' && searchTerm.trim() !== '') {
      url += '&searchTerm=' + encodeURIComponent(searchTerm);
    }
    const response = await api
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('Erro ao filtrar films:', error);
      });

    return response;
  } catch (error) {
    console.error('Erro ao filtrar filmes:', error);
    return [];
  }
};

// export const filterMovies = async (filter) => {
//   const movies = await loadAllMovies();
//   if (!movies) return [];

//   switch (filter) {
//     case 'Recentes':
//       return [...movies].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     case 'Mais Avaliados':
//       return [...movies].sort((a, b) => b.average_stars - a.average_stars);
//     case 'Menos Avaliados':
//       return [...movies].sort((a, b) => a.average_stars - b.average_stars);
//     case 'Mais Comentados':
//       return [...movies].sort((a, b) => b.comments_count - a.comments_count);
//     case 'Nome':
//       if (searchTerm.trim() !== '') {
//         const filteredByName = movies.filter(movie =>
//           movie.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         return filteredByName;
//       }
//     default:
//       return movies;
//   }
// }

export const loadMovieRatings = async (id) => {
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
