import api from '../api';

// Carregar todos os filmes
export const loadAllMovies = async () => {
  try {
    const response = await api.get('api/works/?type=movie');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};

// Carregar um filme específico
export const loadMovie = async (id) => {
  try {
    const response = await api.get(`api/works/?type=movie&id=${id}`);
    return response.data[0];
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
    return null;
  }
};

// Filtrar filmes
export const filterMovies = async (filter, searchTerm = '') => {
  try {
    let url = 'api/works/filter/?filter=' + filter + '&type=movie';
    if (filter === 'name' && searchTerm.trim() !== '') {
      url += '&name=' + encodeURIComponent(searchTerm);
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao filtrar filmes:', error);
    return [];
  }
};

// Carregar avaliações de um filme
export const loadMovieRatings = async (id) => {
  try {
    const response = await api.get(`api/ratings/?work_id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar ratings:', error);
    return [];
  }
};
