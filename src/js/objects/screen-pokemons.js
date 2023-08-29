import showColorPokemon from "../functions/showColorPokemons.js";
import { darkMode } from "../index.js";

export const screenPokemons = {
  PokemonsData: document.querySelector(".cards-pokemons"),

  renderPokemons(poke) {
    let pokemons = poke.map(
      (poke) =>
        `
      <div class="cartao-pokemon ${poke.types.join("-")}">
        <a class="cartao-imagem" href="./pokemon.html?name=${poke.name}">
        <img src="${poke.image}" id="${poke.name}" alt="${poke.name}">
        </a>

        <div class="detalhes">
          <h2 class="nome">${poke.name}</h2>
          <div class="tipos">${poke.types
            .map((type) => {
              return `<span class="tipo ${type}">${type}</span>`;
            })
            .join("")}
            </div>
        </div>
      </div>
        `
    );
    this.PokemonsData.innerHTML = "";
    this.PokemonsData.innerHTML += pokemons;

    showColorPokemon();
    darkMode();
  },
};
