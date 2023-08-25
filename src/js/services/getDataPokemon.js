export async function getDataPokemon(pokemom) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemom}`;
    const response = await fetch(url);
    return await response.json();
  }
  