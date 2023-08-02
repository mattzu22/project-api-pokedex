import {limit} from '../variables.js'

export const fetchPokemons = async (offSet) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offSet}`;
    const response = await fetch(url);
    return await response.json();
  };