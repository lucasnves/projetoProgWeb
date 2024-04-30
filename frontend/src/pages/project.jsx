import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"
import Card from "../components/card";
import perfil from '../assets/perfil.jpg';

function Project() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("")
    const [avaliation, setAvaliation] = useState([])
    const [series, setSeries] = useState([])
    const [top5, setTop5] = useState([])


    useEffect(() => {
        setAvaliation([
            {id: 1, name: 'A revolução dos bichos', description: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electrónica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letraset, que continham passagens com Lorem Ipsum, e mais recentemente com os programas de publicação como o Aldus PageMaker que incluem versões do Lorem Ipsum.', author: 'Lucas Neves', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 2, name: 'O fim da eternidade', description: 'desc 2', author: 'George Wall', created_serie: '07/02/2019', star: 5, created_at: new Date()}
        ])
        setTop5([
            {id: 1, name: 'A TESTE dos bichos', description: 'desc 1', author: 'Lucas Neves', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 2, name: 'A TESTE dos bichos', description: 'desc 1', author: 'George Wall', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 3, name: 'A TESTE dos bicasd adad hos', description: 'desc 1', author: 'lucas', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 4, name: 'A TESTE dos bichos', description: 'desc 1', author: 'George Wall', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 5, name: 'A TESTE dos bichos', description: 'desc 1', author: 'George Wall', created_serie: '07/02/2019', star: 3, created_at: new Date()},
        ])
        setSeries([
            {id: 1, name: 'A TESTE dos bicad hos', description: 'desc 1', author: 'George Wall', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 2, name: 'A TESTE dos bichos', description: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electrónica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letraset, que continham passagens com Lorem Ipsum, e mais recentemente com os programas de publicação como o Aldus PageMaker que incluem versões do Lorem Ipsum.', author: 'George Wall', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 3, name: 'A TESTE dos bichos', description: 'desc 1', author: 'George Wall', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 4, name: 'A TESTE dos bichos', description: 'desc 1', author: 'George Wall', created_serie: '07/02/2019', star: 3, created_at: new Date()},
            {id: 5, name: 'A TESTE dos bichos', description: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electrónica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letraset, que continham passagens com Lorem Ipsum, e mais recentemente com os programas de publicação como o Aldus PageMaker que incluem versões do Lorem Ipsum.', author: 'lucas', created_serie: '07/02/2019', star: 3, created_at: new Date()},
        ])
    }, [])

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
                <Card item={avaliation} title={'Últimas avaliações'} />
                <Card item={series} title={'Recentes'} />
            </div>
            <div>
                <Card item={top5} title={'Mais avalidas'} other={true} />
            </div>
        </div>
    </div>
    
}



export default Project;