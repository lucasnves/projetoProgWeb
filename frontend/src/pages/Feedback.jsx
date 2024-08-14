import '../styles/Feedback.css';
import '../styles/cardFeedback.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  createWork,
  load,
  loadRatings,
  createRating,
  deleteRating,
  updateRating,
  getCurrentUser,
  getUserById,
} from '../lib/store';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Feedback() {
  const { type, itemID } = useParams();
  const [typeWork, setTypeWork] = useState('');
  const [item, setItem] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState('');
  const [score, setScore] = useState('1');
  const [userId, setUserId] = useState(1);
  const [userNames, setUserNames] = useState({});
  const [editingRating, setEditingRating] = useState(null);

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
        await updateUserNames(loadAllRating);
      } catch (e) {
        console.log('Erro ao carregar avaliações:', e);
      }
    } else {
      if (!item) return;
      let data = null;
      switch (type) {
        case 'movie':
          setTypeWork('movie');
          data = {
            id: item.id,
            name: item.title,
            description: item.overview,
            ...(item.production_companies && item.production_companies.length
              ? { author: item.production_companies[0].name }
              : { author: '-' }),
            work_created: new Date().getFullYear(),
            genres: [1, 2],
            box_office: item.revenue,
            year_released: new Date(item.release_date).getFullYear(),
          };
          break;
        case 'tv':
          setTypeWork('series');
          data = {
            id: item.id,
            name: item.name,
            description: item.overview,
            work_created: new Date().getFullYear(),
            genres: [1, 2],
            seasons: item.number_of_seasons,
            episodes: item.number_of_episodes,
            year_started: new Date(item.first_air_date).getFullYear(),
            year_ended: new Date(item.last_air_date).getFullYear(),
            ...(item.created_by && item.created_by.length
              ? { author: item.created_by[0].name }
              : { author: '-' }),
          };
          break;
      }
      if (data && typeWork) {
        const result = await createWork(data, typeWork);
        console.log('CRIADO OBRA!', result);
      } else {
        console.error('Tipo de obra inválido');
      }
    }
  };

  const fetchCurrentUser = async () => {
    const user = await getCurrentUser();
    if (user) {
      setUserId(user.id);
    }
  };

  const updateUserNames = async (ratings) => {
    const names = {};
    for (const rating of ratings) {
      if (!names[rating.user]) {
        const userDetails = await getUserById(rating.user);
        if (userDetails) {
          names[rating.user] = userDetails.username;
        }
      }
    }
    setUserNames(names);
  };

  useEffect(() => {
    getItemById();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (itemID) {
      getItemBdId();
    }
  }, [itemID, item]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ratingData = {
      user: userId,
      work: itemID,
      star: parseInt(score, 10),
      comment: comment,
    };

    const ratings = await loadRatings(itemID);
    const userHasRated = ratings.some((rating) => rating.user === userId);

    if (!userHasRated) {
      const result = await createRating(ratingData);

      if (result) {
        console.log('Avaliação criada com sucesso:', result);
        setComment('');
        setScore('1');
        await getItemBdId();
      } else {
        console.error('Erro ao criar avaliação.');
      }
    } else {
      console.log('O usuário já avaliou este item.');
    }
  };

  const handleEdit = (rating) => {
    setComment(rating.comment);
    setScore(rating.star.toString());
    setEditingRating(rating);

    window.scrollTo({
      top: 80,
      behavior: 'smooth',
    });
  };

  const handleDelete = async (ratingId) => {
    try {
      await deleteRating(ratingId);
      console.log('Avaliação excluída com sucesso');
      await getItemBdId();
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedRatingData = {
      user: userId,
      work: itemID,
      star: parseInt(score, 10),
      comment: comment,
    };

    try {
      await updateRating(editingRating.id, updatedRatingData);
      console.log('Avaliação atualizada com sucesso');
      setEditingRating(null);
      setComment('');
      setScore('1');
      await getItemBdId();
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
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
          <form
            className="form"
            onSubmit={editingRating ? handleUpdate : handleSubmit}
          >
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
                {editingRating ? 'Atualizar' : 'Salvar'}
              </button>
              {editingRating && (
                <button
                  type="button"
                  className="form-btn"
                  onClick={() => setEditingRating(null)}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
          <Link to={type === 'movie' ? '/movies' : '/series'}>
            <button className="form-btn mt-3">Cancelar</button>
          </Link>
        </div>
      </div>
      <div>
        {ratings.map((rating, index) => (
          <div key={index} className="comment-card">
            <div className="comment-header">
              <div className="comment-user">
                {userNames[rating.user] || 'Carregando...'}
              </div>
              <div className="comment-rating">
                {'★'.repeat(rating.star)}
                {rating.user === userId && (
                  <div className="comment-actions">
                    <FaEdit
                      className="comment-action-icon"
                      onClick={() => handleEdit(rating)}
                    />
                    <FaTrash
                      className="comment-action-icon"
                      onClick={() => handleDelete(rating.id)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="comment-body">
              <p>{rating.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
