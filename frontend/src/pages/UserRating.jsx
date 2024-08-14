import { useEffect, useState } from 'react';
import {
  loadUserRatings,
  getCurrentUser,
  deleteRating,
  load,
} from '../lib/store';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/UserRating.css';

export default function UserRatings() {
  const [ratings, setRatings] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRatings = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
        const userRatings = await loadUserRatings(user.id);
        setRatings(userRatings);
      }
    };
    fetchUserRatings();
  }, []);

  const handleEdit = async (movieId, rating) => {
    const data = await load(movieId);
    let type = '';
  
    if (data.year_ended !== undefined) {
      type = 'tv';
    } else if (data.box_office !== undefined) {
      type = 'movie';
    } else {
      type = 'unknown';
    }
    navigate(`/feedback/${type}/${movieId}`, { state: { rating: rating } });
  };

  const handleDelete = async (ratingId) => {
    try {
      await deleteRating(ratingId);
      setRatings(ratings.filter((rating) => rating.id !== ratingId));
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
    }
  };

  return (
    <div className="user-ratings-container">
      <h2>Minhas Avaliações</h2>
      <div className="ratings-list">
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <div key={rating.id} className="rating-card">
              <div className="rating-header">
                <div className="rating-title">{rating.work.name}</div>
                <div className="rating-stars">{'★'.repeat(rating.star)}</div>
              </div>
              <div className="rating-comment">{rating.comment}</div>
              <div className="rating-actions">
                <FaEdit
                  className="action-icon"
                  onClick={() => handleEdit(rating.work, rating)}
                />
                <FaTrash
                  className="action-icon"
                  onClick={() => handleDelete(rating.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não avaliou nenhum item.</p>
        )}
      </div>
    </div>
  );
}
