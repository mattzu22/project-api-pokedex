import { detailsPokemon } from "../services.js";

export default async function fillPokemonsDetails(pokemonData) {
  console.log(pokemonData);
    const url = pokemonData.url;
    const response = await fetch(url);
    const pokemon = await response.json();
  
    const types = pokemon.types.map((type) => type.type.name);
  
    detailsPokemon.push({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      types: types,
    });
  }