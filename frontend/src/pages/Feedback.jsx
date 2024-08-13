import '../styles/Feedback.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Feedback() {
  const { type, itemID } = useParams();
  const [item, setItem] = useState([]);

  const getItemById = () => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/${type}/${itemID}`,
      params: {
        api_key: 'e58c5ed0f045b0e8da70ad316a551a6e',
        language: 'pt-BR',
      },
    }).then((response) => {
      console.log(response.data);
      setItem(response.data);
    });
  };

  useEffect(() => {
    getItemById();
  }, []);

  return (
    <div className="form-container">
      <img
        className="movie-card-image"
        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
      />
      <div className="card-bottom-container">
        <h3>{item.title ? item.title : item.name}</h3>
        <p>{item.overview ? item.overview : ''}</p>
        <form className="form">
          <div className="form-group form-group">
            <label htmlFor="email">Informe seu email</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group form-group">
            <label htmlFor="score">Informe sua avaliação</label>
            <select className="form-control" id="score">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-btn-container">
            <button type="submit" className="form-btn">
              Salvar
            </button>
          </div>
        </form>
        <Link to={type == 'movie' ? '/movies' : '/series'}>
          <button className="form-btn mt-3">Cancelar</button>
        </Link>
      </div>
    </div>
  );
}
