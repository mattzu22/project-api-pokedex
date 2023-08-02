import { detailsPokemon } from "../variables.js";

export const filteredPokemons = (inputValue) => {
    if (inputValue !== "") {
      return detailsPokemon.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(inputValue);
      });
    } else {
      return detailsPokemon;
    }
  };