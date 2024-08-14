import React from 'react';
import '../styles/Card.css';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';
import Score from './Score';

export default function Card({ item, type }) {
  const navigate = useNavigate();

  const onClick = (item) => {
    if (type == undefined) {
      if (item.media_type == "tv") {
        type = "tv";
      }
      else {
        type = "movie";
      }
    }
    navigate(`/feedback/${type}/${item.id}`);
  };

  return (
    <ul className="card-list">
      {item.map((item) => (
        <li
          key={item.id}
          className="card-content"
          onClick={() => onClick(item)}
        >
          <div className="poster">
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            />
          </div>
          <div className="card-info">
            <div className="card-title">
              <p>{item.title ? item.title : item.name}</p>
            </div>
            <div className="hidden-content">
              <p>
                {item.release_date ? item.release_date : item.first_air_date}
              </p>
              {item.overview && (
                <p className="description">
                  {item.overview.length > 100
                    ? `${item.overview.substring(0, 100)}...`
                    : item.overview}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
