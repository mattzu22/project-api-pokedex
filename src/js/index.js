import { fetchPokemons } from "./services/pokemons.js";
import { screenPokemons } from "./objects/screen-pokemons.js";
import fillPokemonsDetails from "./services/fillPokemons.js";
import updateFilteredPokemon from "./functions/updateFilteredPokemon.js";
import {
  detailsPokemon,
  buttonSearch,
  loadPokemons,
} from "./variables.js";
import fetchMorePokemons from "./services/morePokemons.js";

let offset = 0;

async function pokeDetails() {
  const data = await fetchPokemons(offset);
  const { results } = data;

  await Promise.all(
    results.map(async (pokemonData) => {
      await fillPokemonsDetails(pokemonData);
    })
  );

  screenPokemons.renderPokemons(detailsPokemon);
}
pokeDetails();


loadPokemons.addEventListener("click", () => {
  loadPokemons.classList.add("button--loading");

  setTimeout(() => {
    fetchMorePokemons();
    loadPokemons.classList.remove("button--loading");
  }, 1500);
});

buttonSearch.addEventListener("click", updateFilteredPokemon);
