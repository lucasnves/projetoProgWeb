import { createWork } from "../lib/store";

export default function Documentary() {
  const teste = async () => {
    const movie = {
      id: 2020,
      name: "Novo Filme",
      description: "Descrição do novo filme",
      author: "Autor Exemplo",
      work_created: 2024,
      genres: [1, 2],
      box_office: 20,
      year_released: 2010
    };
    const series = {
      id: 2020,
      name: "nova serie",
      description: "Descrição do aaaaaaaaaaaaaaaaaa filme",
      author: "Autor aaaaa",
      work_created: 2024,
      genres: [1, 2], // IDs dos gêneros
      seasons: 2,
      episodes: 230,
      year_started: 2010,
      year_ended: 2020,
    };
    const documentary = {
      id: 2020,
      name: "Novo DOCUMENTA",
      description: "Descrição do novo filme",
      author: "Autor SSSSSSSSSSSSSSSSSSSSS",
      work_created: 2024,
      genres: [1], // IDs dos gêneros
      duration: 4,
      country_of_origin: "Brasil",
      theme: "Terror",
    };
    const dataM = await createWork(movie, 'movie');
    const dataS = await createWork(series, 'series');
    const dataD = await createWork(documentary, 'documentary');
    console.log(dataM);
    console.log(dataS);
    console.log(dataD);
  }


  return (
    <>
      <h1>Página de Documentários</h1>
      <button onClick={() => teste()}>aa</button>
    </>
  );
}
