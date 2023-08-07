import { fetchPokemons }  from "./fetchPokemons.js";
import { screenPokemons } from "../objects/screen-pokemons.js";
import fillPokemonsDetails from "./fillPokemons.js";
import { detailsPokemon } from "../variables.js";

let offSet = 0;
const limit = 10;


export default function fetchMorePokemons() {
    offSet += limit;
    fetchPokemons(offSet).then((data) => {
      const { results } = data;
      results.map(async (pokemonData) => {
        await fillPokemonsDetails(pokemonData);
  
        if (fillPokemonsDetails) {
          screenPokemons.renderPokemons(detailsPokemon);
        }
      });
    });
  }