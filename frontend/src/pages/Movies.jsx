import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { filterMovies, loadAllMovies } from '../lib/store';

export default function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filtro, setFiltro] = useState('Filmes');
  const [ratings, setRatings] = useState([]);

  const load = async () => {
    const data = await loadAllMovies();
    setMovies(data);
  };

  const onClick = async (item) => {
    navigate(`/movie/${item.id}`);
  };

  const onClickFilter = async (item) => {
    const data = await filterMovies(item.id);
    setFiltro(item.name);
    setMovies(data);
  };

  useEffect(() => {
    load();
    // const movieName = "teste2";
    // api.get(`api/movies/?name=${movieName}`)
  }, []);

  const filters = [
    { id: 1, name: 'Recentes' },
    { id: 2, name: 'Mais Avaliados' },
    { id: 3, name: 'Menos Avaliados' },
    { id: 4, name: 'Mais Comentados' },
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
          <h4>Procurar...</h4>
        </div>
      </div>
      <div>
        {ratings.map((item) => (
          <h5 key={item.id}>{item.star}</h5>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card item={movies} title={filtro ?? 'Filmes'} onClick={onClick} />
      </div>
    </>
  );
}
