import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"
import Card from "../components/card";
import perfil from '../assets/perfil.jpg';

function Home() {
    const [movies, setMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);

    const loadAllMovies = async () => {
        const loadMovies = await api.get('api/movies/')
            .then(response => { return response.data;})
            .catch(error => { console.error('Erro ao buscar filmes:', error);});

        setMovies(loadMovies);
        setTopMovies(() => {
            if (!loadMovies) return [];
            const sortedMovies = [...loadMovies].sort((a, b) => b.average_stars - a.average_stars);
            return sortedMovies.slice(0, 5);
        })
    }

    const handleClickCard = (movie) => {
        console.log('Card clicado:', movie);
    };

    useEffect(() => {
        loadAllMovies()
        // const movieName = "teste2";
        // api.get(`api/movies/?name=${movieName}`)
    }, []);

    return <div className="container">
        <div
            style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 30,
                margin: 10
            }}>
            <h1>LOGO</h1>
            <div style={{display: 'flex', gap: 30, borderWidth: 2, borderColor: 'black', backgroundColor: '#eee', padding: 20, borderRadius: 10, width: '50%'}}>
                <p style={{fontWeight: 900}}>Home</p>
                <p s>Buscar</p>
            </div>
            <div style={{ width: '50px', height: '50px', borderRadius: '8px',overflow: 'hidden' }}>
                <img
                    src={perfil}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <div style={{padding: 5, width: '60%'}}>
                {/* <Card item={avaliation} title={'Últimas avaliações'}  onClick={handleClickCard}/> */}
                <Card item={movies} title={'Recentes'} onClick={handleClickCard} />
            </div>
            <div>
                <Card item={topMovies} title={'Mais avalidas'} other={true} onClick={handleClickCard}/>
            </div>
        </div>
    </div>   
}

export default Home;