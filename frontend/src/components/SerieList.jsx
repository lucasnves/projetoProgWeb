import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function SerieList() {
    const [series, setSeries] = useState([]);

    const getSeries = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/tv',
            params: {
                api_key: 'e58c5ed0f045b0e8da70ad316a551a6e',
                language: 'pt-BR'
            }
        }).then(response => {
            setSeries(response.data.results);
        })
    }

    useEffect(() => {
        getSeries();
    }, []);

    return (
        <Card item={series} />
    );
}