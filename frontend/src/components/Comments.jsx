import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Score from './Score';

export default function Comments({ ratings, userNames, userId, handleDelete, handleEdit }) {

  return (
    <div>
      {ratings.map((rating, index) => (
        <div key={index} className="comment-card card-content">
          <div className="comment-header">
            <div className="comment-user">
              {typeof (userNames) === 'string' ? userNames : userNames[rating.user]}
            </div>
            <div className="comment-rating">
              <Score numStars={rating.star} />
            </div>
          </div>
          <div className="comment-body">
            <p>{rating.comment}</p>
          </div>
          <div className="comment-actions">
            {rating.user === userId && (
              <div className="comment-action-icon">
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(rating, rating.work)} />
                <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(rating.id)} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
