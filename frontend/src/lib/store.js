import api from '../api';

// Carregar todos os filmes
// Type: movie, series, documentary
export const loadAllWorks = async (type) => {
  try {
    const response = await api.get('api/works/?type=' + type);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};

// Carregar um filme específico
export const load = async (id) => {
  try {
    const response = await api.get(`api/works/?id=${id}`);
    return response.data[0];
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
    return null;
  }
};

// Filtrar filmes
// Type: movie, series, documentary
export const filterWorks = async (filter, type, searchTerm = '') => {
  try {
    let url = 'api/works/filter/?filter=' + filter + '&type=' + type;
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
export const loadRatings = async (id) => {
  try {
    const response = await api.get(`api/ratings/?work_id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar ratings:', error);
    return [];
  }
};

/*
 * const movie = {
 *  name: "Novo Filme",
 *  description: "Descrição do novo filme",
 *  author: "Autor Exemplo",
 *  work_created: 2024,
 *  genres: [1, 2], // IDs dos gêneros
 *  box_office: 20
 *  year_released: 2010
 * };
 * 
 * const series = {
 *  name: "Novo Filme",
 *  description: "Descrição do novo filme",
 *  author: "Autor Exemplo",
 *  work_created: 2024,
 *  genres: [1, 2], // IDs dos gêneros
 *  seasons: 4,
 *  episodes: 230,
 *  year_started: 2010,
 *  year_ended: 2020,
 * };
 * 
 * const documentary = {
 *  name: "Novo Filme",
 *  description: "Descrição do novo filme",
 *  author: "Autor Exemplo",
 *  work_created: 2024,
 *  genres: [1, 2], // IDs dos gêneros
 *  duration: 4,
 *  country_of_origin: "Brasil",
 *  theme: "Terror",
 * };
 */

// type: movie, series, documentary
// Adicionar uma nova obra
export const createWork = async (data, type) => {
  try {
    const requestData = { ...data, work_type: type };
    const response = await api.post(`api/works/`, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar obra:', error);
    return null;
  }
};
