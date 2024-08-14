import '../styles/Feedback.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createWork, load } from '../lib/store';

export default function Feedback() {
  const { type, itemID } = useParams();
  const [typeWork, setTypeWork] = useState("");
  const [item, setItem] = useState([]);
  const [ratings, setRatings] = useState([]);

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

  const getItemBdId = async () => {
    const loadWork = await load(itemID);
    if (loadWork) {
      try {
        const loadRatings = await loadRatings(itemID);
        setRatings(loadRatings);
      } catch (e) {
        console.log("erro")
      }
    } else {
      if(!item) return
      console.log('item', item)
      let data = null;
      switch (type) {
        case 'movie':
          setTypeWork('movie');
          data = {
            id: item.id,
            name: item.title,
            description: item.overview,
            ...(item.production_companies && item.production_companies.length ? { author: item.production_companies[0].name } : {author: '-'}),
            work_created: new Date().getFullYear(),
            genres: [1, 2],
            box_office: item.revenue,
            year_released: new Date(item.release_date).getFullYear(),
          }
          break;
        case 'tv':
          setTypeWork('series');
          data = {
            id: item.id,
            name: item.name,
            description: item.overview,
            work_created: new Date().getFullYear(),
            genres: [1, 2], // IDs dos gêneros
            seasons: item.number_of_seasons,
            episodes: item.number_of_episodes,
            year_started: new Date(item.first_air_date).getFullYear(),
            year_ended: new Date(item.last_air_date).getFullYear(),
            ...(item.created_by && item.created_by.length ? { author: item.created_by[0].name } : { author: '-' })
          }
          break;
        case 'documentary':
          setTypeWork('documentary');
          data = {
            id: item.id,
            name: item.title,
            description: item.overview,
            author: 'Autor SSSSSSSSSSSSSSSSSSSSS',
            work_created: new Date().getFullYear(),
            genres: [1], // IDs dos gêneros
            duration: item.runtime,
            country_of_origin: 'Brasil',
            theme: 'Terror',
          }
          break;
      };
      if (data && typeWork) {
        console.log(data, typeWork)
        const result = await createWork(data, typeWork);
        console.log(result);
      } else {
        console.error('Tipo de obra inválido');
      }
    }
  };

  useEffect(() => {
    getItemById();
  }, []);

  useEffect(() => {
    getItemBdId();
  }, [item])

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
