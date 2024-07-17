# Projeto Django + React - Absolute Cinema

## Visão Geral

Este projeto é uma aplicação web desenvolvida com Django no backend e React no frontend. A aplicação consiste numa plataforma de avaliação de obras audiovisuais, permitindo aos usuários visualizar filmes, séries e documentários. Além disso, os usuários podem comentar e avaliar cada obra.

### Tecnologias utilizadas:
- HTML
- CSS
- Django
- React
- Bootstrap

## Funcionalidades

- **Listagem de Filmes, Séries e Documentários**: Exibe uma lista completa de todos os itens de mídia disponíveis.
- **Pesquisa por Título**: Permite aos usuários buscar por filmes, séries ou documentários específicos pelo título.
- **Detalhes da obra**: Fornece informações detalhadas sobre cada obra, incluindo sinopse, diretor, gênero, ano de lançamento e duração.
- **Autenticação de Usuários**: Sistema de registro e login para usuários, com diferentes níveis de acesso (usuário comum e administrador).
- **Comentários e Avaliações**: Usuários autenticados podem comentar e avaliar os filmes, séries e documentários, permitindo interações e feedbacks sobre cada obra.

### Visualização de Obras

Os usuários podem clicar em qualquer item de mídia listado para visualizar uma página de detalhes. Esta página inclui:

- **Sinopse**: Uma descrição detalhada do filme, série ou documentário.
- **Diretor**: Nome do diretor.
- **Gênero**: Categorias como drama, comédia, documentário, etc.
- **Ano de Lançamento**: Ano em que o filme, série ou documentário foi lançado.
- **Duração**: Tempo de execução.

### Comentários e Avaliações

Na página de detalhes de cada item de mídia, os usuários autenticados podem:

- **Adicionar Comentários**: Escrever suas opiniões e discutir com outros usuários.
- **Avaliar a Obra**: Dar uma nota de 1 a 5 estrelas.
- **Ver Comentários e Avaliações**: Ler os comentários e ver as avaliações de outros usuários.

## Estrutura do Projeto

### Backend (Django)

- `manage.py`: Script de gerenciamento do Django.
- `backend/`: Diretório principal da aplicação Django.
  - `settings.py`: Configurações do projeto.
  - `urls.py`: Configurações de URLs do projeto.
  - `wsgi.py`: Configurações do WSGI.
- `api/`: Aplicação responsável pelo gerenciamento de mídia.
  - `models.py`: Modelos de dados.
  - `views.py`: Visualizações (Views) da aplicação.
  - `urls.py`: URLs da aplicação.
  - `serializers.py`: Serializadores para a API REST.
  - `admin.py`: Configurações do admin do Django.
  - `tests.py`: Testes automatizados.

### Frontend (React)

- `src/`: Diretório principal da aplicação React.
  - `assets/`: Arquivos estáticos de completo do contéudo, como imagens, logos, etc. 
  - `components/`: Componentes reutilizáveis da interface.
  - `lib/`: Arquivos de store para contatar a API.
  - `pages/`: Páginas principais da aplicação.
  - `services/`: Serviços para comunicação com a API.
  - `App.jsx`: Componente principal da aplicação.
  - `Rotas.jsx`: Componente controlador da navegação de paginas do site. 

## Pré-requisitos

- Python 3.x
- Node.js
- npm ou yarn

## Instalação

### Backend

1. Clone o repositório:
    ```sh
    git clone https://github.com/lucasnves/projetoProgWeb.git
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd projetoProgWeb
    ```
3. Crie e ative um ambiente virtual:
    ```sh
    python -m venv venv
    source venv/bin/activate  # No Windows, use `venv\Scripts\activate`
    ```
4. Instale as dependências:
    ```sh
    pip install -r requirements.txt
    ```
5. Configure o banco de dados no `settings.py` e aplique as migrações:
    ```sh
    python manage.py migrate
    ```
6. Inicie o servidor de desenvolvimento:
    ```sh
    python manage.py runserver
    ```

### Frontend

1. Navegue até o diretório `frontend`:
    ```sh
    cd frontend
    ```
2. Instale as dependências:
    ```sh
    npm install  # ou `yarn install`
    ```
3. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev  # ou `yarn run dev`
    ```
