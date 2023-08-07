let detailsPokemon = [];
const cardsPokemons = document.querySelector(".cards-pokemons");
const searchInput = document.getElementById("search-pokemon");
const buttonSearch = document.getElementById("search");
const loadPokemons = document.getElementById("btn");
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
let offSet = 0;
let limit = 10;

export {
  detailsPokemon,
  cardsPokemons,
  searchInput,
  buttonSearch,
  loadPokemons,
  offSet,
  limit,
  baseUrl,
};


