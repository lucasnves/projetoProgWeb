import Card from "../components/Card";
import { useLocation } from 'react-router-dom';

export default function SearchResult() {

    const location = useLocation();
    const { results, query } = location.state;

    return (
        <>
            <div className="text-area" style={{ 'padding': '20px 0 10px 20px' }}>
                <h2 style={{ 'fontSize': '30px' }}>Resultado da busca por &quot;{query}&quot;</h2>
            </div>
            <Card item={results} />
        </>
    );
}