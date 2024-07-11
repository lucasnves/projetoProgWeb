import logo from '../assets/images/cinema.svg';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg main-nav">
      <div className="container-fluid">
        <a className="navbar-brand main-logo" href="/">
          <img src={logo} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Início
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/movies"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Filmes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/series"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Séries
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/documentary"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Documentários
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
