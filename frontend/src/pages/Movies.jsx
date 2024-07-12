import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { filterMovies, loadAllMovies } from '../lib/store';

export default function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filtro, setFiltro] = useState('Filmes');
  const [searchMovie, setSearchMovie] = useState('');

  const load = async () => {
    const data = await loadAllMovies();
    setMovies(data);
  };

  const onClick = async (item) => {
    navigate(`/movie/${item.id}`);
  };

  const onClickFilter = async (item) => {
    const data = await filterMovies(item.filter);
    setFiltro(item.name);
    setMovies(data);
  };

  const onSearchChange = (event) => {
    setSearchMovie(event.target.value);
  };

  const searchMovies = async () => {
    if (searchMovie.trim() !== '') {
      const data = await filterMovies('name', searchMovie);
      setFiltro(`Resultado da busca por "${searchMovie}"`);
      setMovies(data);
    } else {
      load();
      setFiltro('Filmes');
    }
  };

  useEffect(() => {
    load();
    // const movieName = "teste2";
    // api.get(`api/movies/?name=${movieName}`)
  }, []);

  const filters = [
    { id: 1, name: 'Recentes', filter: 'recents' },
    { id: 2, name: 'Melhor Avaliado', filter: 'best_rated' },
    { id: 3, name: 'Mais Avaliados', filter: 'top_rated' },
    { id: 4, name: 'Menos Avaliados', filter: 'least_rated' },
    { id: 5, name: 'Mais Comentados', filter: 'most_commented' },
  ];

  return (
    <>
      <div>
        <h3>Filtros:</h3>
        <div>
          {filters.map((item) => (
            <h4 key={item.id} onClick={() => onClickFilter(item)}>
              {item.name}
            </h4>
          ))}
        </div>
        <div>
          <input type="text" value={searchMovie} onChange={onSearchChange} />
          <button onClick={searchMovies}>Buscar</button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card item={movies} title={filtro ?? 'Filmes'} onClick={onClick} />
      </div>
    </>
  );
}
