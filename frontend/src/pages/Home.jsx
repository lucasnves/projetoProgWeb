import SearchInput from '../components/SearchInput';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-content">
      <div className="text-content">
        <h1>Absolute Cinema</h1>
        <h2>O site da sétima arte mais completo do mundo.</h2>
        <p>Aqui você encontra tudo o que deseja.</p>
      </div>
      <SearchInput />
    </div>
  );
}

export default Home;
