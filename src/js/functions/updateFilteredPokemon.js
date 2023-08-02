import { searchInput } from "../variables.js";
import { filteredPokemons } from "./filteredPokemons.js";
import { screenPokemons } from "../objects/screen-pokemons.js";

export default function updateFilteredPokemon() {
    const inputValue = searchInput.value.toLowerCase();
    const filterPokemons = filteredPokemons(inputValue);
    screenPokemons.renderPokemons(filterPokemons)
  }
  