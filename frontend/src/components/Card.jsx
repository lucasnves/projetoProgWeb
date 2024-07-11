import React from 'react';
import poster from '../assets/images/avatar.jpg';
import '../styles/Card.css';
import Comments from './Comments';

export default function Card({ item, title, href, other, onClick }) {
  console.log(item);
  function renderStars(numStars) {
    let stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <svg
          key={i}
          width={other ? '20' : '24'}
          height={other ? '20' : '24'}
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
          width={other ? '18' : '22'}
          height={other ? '18' : '22'}
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
    <div>
      <div className="card-title">
        <h3>{title}</h3>
        <h4>Ver mais</h4>
      </div>
      {item.map((item) => (
        <div
          key={item.id}
          className="card-content"
          onClick={() => onClick(item)}
        >
          <img
            style={
              other
                ? { width: 90, borderRadius: 3 }
                : { width: 120, borderRadius: 3 }
            }
            src={poster}
          />
          {other ? (
            <div
              style={{
                minWidth: 250,
                maxWidth: 250,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <small>{item.author}</small>
              </div>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2>{renderStars(item.average_stars)}</h2>
              </div>
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>{item.name}</h2>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <h2>{renderStars(item.average_stars)}</h2>
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
          )}
        </div>
      ))}
    </div>
  );
}
