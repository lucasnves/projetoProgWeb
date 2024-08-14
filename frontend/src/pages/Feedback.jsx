import '../styles/Feedback.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createWork, load, loadRatings, createRating, loadAllWorks } from '../lib/store';

export default function Feedback() {
  const { type, itemID } = useParams();
  const [typeWork, setTypeWork] = useState("");
  const [item, setItem] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState('');
  const [score, setScore] = useState('1');
  const [userId, setUserId] = useState(1);

  const getItemById = () => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/${type}/${itemID}`,
      params: {
        api_key: 'e58c5ed0f045b0e8da70ad316a551a6e',
        language: 'pt-BR',
      },
    }).then((response) => {
      setItem(response.data);
    });
  };

  const getItemBdId = async () => {
    const loadWork = await load(itemID);

    if (loadWork) {
      try {
        const loadAllRating = await loadRatings(itemID);
        setRatings(loadAllRating);
        console.log("AAAAAAAAAA" + ratings);
      } catch (e) {
        console.log("erro")
      }
    } else {
      if (!item) return
      console.log('item', item)
      let data = null;
      switch (type) {
        case 'movie':
          setTypeWork('movie');
          data = {
            id: item.id,
            name: item.title,
            description: item.overview,
            ...(item.production_companies && item.production_companies.length ? { author: item.production_companies[0].name } : { author: '-' }),
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
  }, [item]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ratingData = {
      user: userId,
      work: itemID,
      star: parseInt(score, 10),
      comment: comment,
    };

    const result = await createRating(ratingData);
    if (result) {
      console.log('Avaliação criada com sucesso:', result);
    } else {
      console.error('Erro ao criar avaliação.');
    }
  };

  return (
    <>
      <div className="form-container">
        <img
          className="movie-card-image"
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
        />
        <div className="card-bottom-container">
          <h3>{item.title ? item.title : item.name}</h3>
          <p>{item.overview ? item.overview : ''}</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group form-group">
              <label htmlFor="comment">Comentário</label>
              <textarea
                className="form-control"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="form-group form-group">
              <label htmlFor="score">Informe sua avaliação</label>
              <select
                className="form-control"
                id="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-btn-container">
              <button type="submit" className="form-btn">
                Salvar
              </button>
            </div>
          </form>
          <Link to={type === 'movie' ? '/movies' : '/series'}>
            <button className="form-btn mt-3">Cancelar</button>
          </Link>
        </div>
      </div>
      <div className="comments">
        {ratings.map(comment => {
          console.log(comment);
        }
        )}
      </div>
    </>
  );
}