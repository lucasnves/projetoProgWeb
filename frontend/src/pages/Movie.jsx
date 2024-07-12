import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadAllRatings, loadMovie } from '../lib/store';

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [ratings, setRatings] = useState([]);

  const load = async () => {
    const data = await loadMovie(id);
    const dataRatings = await loadAllRatings(id);

    setMovie(data);
    setRatings(dataRatings);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div>
        <p>{movie.name}</p>
        <p>{movie.average_stars}</p>
        <p>{movie.comments_count}</p>
        <p>{movie.movie_created}</p>
        <p>{movie.author}</p>
      </div>
      <div>
        {ratings.map((item) => (
          <div key={item.id}>
            <p>
              {item.id} - {item.comment} - {item.star}
            </p>
            <p>{item.user}</p>
          </div>
        ))}
      </div>
    </>
  );
}
