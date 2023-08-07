import {baseUrl, limit} from '../variables.js'


export const fetchPokemons = async (offSet) => {
    const url = `${baseUrl}?limit=${limit}&offset=${offSet}`;
    const response = await fetch(url);
    return await response.json();
  };



  