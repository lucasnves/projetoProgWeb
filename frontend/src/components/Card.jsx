import React from 'react';
import '../styles/Card.css';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';
import Feedback from '../pages/Feedback';

export default function Card({ item }) {
  const navigate = useNavigate();

  function renderStars(numStars) {
    let stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <svg
          key={i}
          width={'24'}
          height={'24'}
          viewBox="0 0 24 24"
          fill="#ffb300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      );
    }
    for (let i = numStars; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          width={'22'}
          height={'22'}
          viewBox="0 0 24 26"
          fill="none"
          stroke="#ffb300"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      );
    }
    return stars;
  }

  const onClick = (item) => {
    navigate(`/feedback/${item.id}`);
    <Feedback item={item} />;
  };

  return (
    <ul className='card-list'>
      {item.map((item) => (
        <li
          key={item.id}
          className="card-content"
          onClick={() => onClick(item)}
        >
          <div className="poster">
            <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} />
          </div>
          <div>
            <div className='card-title'>
              <p>
                {item.title ? item.title : item.name}
              </p>
            </div>
            <div className="card-info">
              <p>
                {item.release_date ? item.release_date : item.first_air_date}
              </p>
              <p>{item.overview}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
