import React from 'react';
import poster from '../assets/images/avatar.jpg';
import '../styles/Card.css';
import Comments from './Comments';

export default function Card({ item, title, href, onClick }) {
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

  return (
    <div style={{ width: '80%' }}>
      <div className="card-title">
        <p style={{ fontWeight: 700, fontSize: 32 }}>{title}</p>
        <p style={{ fontWeight: 500, fontSize: 20 }}>Ver mais</p>
      </div>
      {item.map((item) => (
        <div
          key={item.id}
          className="card-content"
          onClick={() => onClick(item)}
        >
          <img style={{ width: 130, borderRadius: 8 }} src={poster} />
          <div style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: 'red'
              }}
            >
              <p style={{ fontWeight: 700, fontSize: 28 }}>{item.name}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <p>{renderStars(item.average_stars)}</p>
                <Comments item={item.comments_count} />
              </div>
            </div>
            <small>
              {item.author} • {item.movie_created}
            </small>
            <br />
            <br />
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
