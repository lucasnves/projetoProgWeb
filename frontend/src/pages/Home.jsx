import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div className="home-content">
      <div className="text-content">
        <h1>Absolute Cinema</h1>
        <h2>O site da sétima arte mais completo do mundo.</h2>
        <p>Aqui você encontra tudo o que deseja.</p>
      </div>
      <div className="input-group mb-3 search-input">
        <input type="text" className="form-control" placeholder="Explorar" />
        <button className="btn btn-outline-secondary" type="button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
}

export default Home;
