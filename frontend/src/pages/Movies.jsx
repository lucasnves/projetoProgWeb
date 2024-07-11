import { useState, useEffect } from 'react';
import api from '../api';
import Card from '../components/Card';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  const loadAllMovies = async () => {
    const loadMovies = await api
      .get('api/movies/')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      });

    setMovies(loadMovies);
    setTopMovies(() => {
      if (!loadMovies) return [];
      const sortedMovies = [...loadMovies].sort(
        (a, b) => b.average_stars - a.average_stars
      );
      return sortedMovies.slice(0, 5);
    });
  };

  useEffect(() => {
    loadAllMovies();
    // const movieName = "teste2";
    // api.get(`api/movies/?name=${movieName}`)
  }, []);

  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ padding: 5, width: '60%' }}>
            <Card item={movies} title={'Recentes'} />
          </div>
          <div>
            <Card item={topMovies} title={'Melhores avaliados'} other={true} />
          </div>
        </div>
      </div>
    </>
  );
}
