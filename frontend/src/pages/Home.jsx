import { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Home.css';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

function Home() {
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

  const handleClickCard = (movie) => {
    console.log('Card clicado:', movie);
  };

  useEffect(() => {
    loadAllMovies();
    // const movieName = "teste2";
    // api.get(`api/movies/?name=${movieName}`)
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ padding: 5, width: '60%' }}>
            <Card item={movies} title={'Recentes'} onClick={handleClickCard} />
          </div>
          <div>
            <Card
              item={topMovies}
              title={'Melhores avaliados'}
              other={true}
              onClick={handleClickCard}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
