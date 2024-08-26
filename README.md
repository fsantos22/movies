# Movies

[Live Demo](https://movies-tawny.vercel.app/)

## Visão geral

Este é um aplicativo de catalogo de filmes e series, onde voce pode consultar e favoritar seus itens preferidos. A aplicacao possui 4 sessoes:

- **Home ("/")**: Sao exibidos filmes e series (maximo de 6 itens exibidos por categoria).

- **Filmes ("/movies")**: Sao exibidos todos os filmes do catalogo.

- **Series ("/tvshows")**: Sao exibidas todas as series do catalogo.

- **Favoritos ("/bookmarks")**: Sao exibidos todos os itens marcados como favoritos (Filmes e series juntos)

## Recursos

- Listagem de filmes e séries

- Adicionar/remover filme como favorito

- Listagem de filmes/series favoritos

## Introdução

### Pré-requisitos

Certifique-se de que você tenha os seguinte itens instalado:

- [Node.js](https://nodejs.org/)

- [npm](https://www.npmjs.com/)

### Instalação

1. Clone o repositório:

```sh
git clone https://github.com/fsantos22/movies.git
cd movies
```

2. Instale as dependências::

```sh
npm install
```

### Executando o aplicativo

3. crie um arquivo .env.local na raiz do projeto e adicione as seguintes variaveis:

```sh
WORDPRESS_API_URL="https://your-endpoint-here.com/graphql"
WORDPRESS_AUTH_TOKEN="your access token"
```

4. iniciar a aplicacao:

```sh
npm run dev
```

Isso executará o servidor de desenvolvimento e o servidor Mock ao mesmo tempo.

### Scripts principais

- **Iniciar app no modo dev:** npm run dev

- **Executar testes:** npm run test

- **Executar testes com cobertura:** npm run test:coverage

- **Build da applicação:** npm run build
