import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadMovieRatings, loadMovie } from '../lib/store';

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [ratings, setRatings] = useState([]);

  const load = async () => {
    const data = await loadMovie(id);
    const dataRatings = await loadMovieRatings(id);

    setMovie(data);
    setRatings(dataRatings);
  };

  useEffect(() => {
    if(id) {
      load();
    }
  }, [id]);

  return (
    <>
      {movie &&<div>
        <p>{movie.name}</p>
        <p>{movie.average_stars}</p>
        <p>{movie.comments_count}</p>
        <p>{movie.year_released}</p>
        <p>{movie.author}</p>
        <p>{movie.box_office}</p>
      </div>}
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
