import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const searchMedia = async () => {
        const API_KEY = 'e58c5ed0f045b0e8da70ad316a551a6e';
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;

        try {
            const response = await axios.get(url);
            setResults(response.data.results);
            navigate('/search-results', { state: { results: response.data.results, query } });
        } catch (error) {
            console.error("Erro ao buscar mídia", error);
        }
    }

    return (
        <div className="input-group mb-3 search-input">
            <input type="text" className="form-control" placeholder="Explorar Filmes e Séries..." value={query} onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button" onClick={searchMedia}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
}