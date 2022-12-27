# Front-end Developer Direção Concursos

Esse desafio para a vaga de Front-end Developer da Direção Concursos foi feito usando o [Next.js](https://nextjs.org/docs/getting-started) e consistia em criar um player de vídeo.

## Instalação
Siga esses passos no terminal para rodar o aplicativo:<br>
``$ cd .\direcao-concursos-desafio\``<br>
``$ npm install``<br>
``$ npm run dev``

## API Utilizada
- [Youtube API](https://developers.google.com/youtube/v3/docs?hl=pt-br): Usada para pesquisar vídeos do Youtube e pegar o ID do vídeo escolhido.
- [YTStream](https://rapidapi.com/ytjar/api/ytstream-download-youtube-videos): Usada para converter um vídeo do Youtube em um MP4 e assim poder criar meu próprio player.

## Bibliotecas
- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/docs/getting-started)
- [Axios](https://axios-http.com/ptbr/docs/intro)

## Funcionalidades
- Player com play, pause, stop e tela cheia;
- Volume que ao clicado aparece dois botões que aumenta ou diminui o som;
- Volume que muta o som;
- Barra de progresso de vídeo que pode ser usado para avançar ou voltar o vídeo quando clicado;
- Tempo de vídeo e duração do vídeo total;
- Playlist com todos os vídeos na categoria "animais", filtra por "cachorros" e "gatos";
- Botão "Pesquisar" que quando clicado abre um input onde o usuário pode digitar uma palavra e, quando clicar no botão "pesquisar" de novo, a playlist é atualizada com os vídeos que possuem a palavra pesquisada.

![uma imagem do site feito](https://i.imgur.com/P9LYo2R.jpg)
