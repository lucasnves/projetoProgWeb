import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'e58c5ed0f045b0e8da70ad316a551a6e',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results);
        })
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <Card item={movies} type={"movie"} />
    );
}