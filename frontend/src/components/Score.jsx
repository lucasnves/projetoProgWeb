export default function Score({ numStars }) {
  let stars = [];
  const numeroEstrelas = Math.round(numStars / 2);
  for (let i = 0; i < numeroEstrelas; i++) {
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
  for (let i = numeroEstrelas; i < 5; i++) {
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
