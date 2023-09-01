import showColorPokemon from "../functions/showColorPokemons.js";
import { showNavInfoPoke } from "../functions/showNavInfoPoke.js";
import { changerPokemonShiny } from "../pokemon.js";
import { darkMode } from "../pokemon.js";

export const screenPokemon = {
  pokemonData: document.querySelector(".card-pokemon"),

  renderPokemon(detail) {
    let pokemon = detail.map(
      (detail) =>
        `
      <div class="container-card-pokemon ${detail.types.join("-")} cartao-pokemon">
        <div class="info-pokemon-top">
          
          <div class="name-type">
            <h2 class="name">${detail.name}</h2>
            <div class="types">${detail.types
              .map((type) => {
                return `<span class="type tipo ${type}">${type}</span>`;
              })
              .join("")}</div>
          </div>  
          <p class="number">#00${detail.id}</p>
  
          <button class="btn-shiny"></button>
        </div>
  
        <div class="info-bottom">
          <img src=${detail.image} class="img-pokemon"/>
              
          <div class="poke-details">
            <nav class="navegation">
              <ul class="menu">
                <li class="selecionado" id="0">Status</li>
                <li id="1">Moves</li>
                <li id="2">Abilities</li>
              </ul>
            </nav>
  
            <div class="info">    
              <div class="status info-poke aberto" id="info-0">
                <h3>Status</h3>
  
                <ul class="info-status">
                  ${detail.stats
                    .map((stat) => {
                      return `<li>${stat.nameStats}: ${stat.baseStats}</li>`;
                    })
                    .join("")}
                </ul>
              </div>
            
  
              <div class="moves info-poke" id="info-1">
                  <h3>Moves</h3>
  
                  <ul>
                    ${detail.movesSelect
                      .map((moves) => {
                        return `
                      <li>${moves.move.name}</li>
                      `;
                      })
                      .join("")}
                  </ul>
              </div>
  
              <div class="abilities info-poke" id="info-2">
                  <h3>Abilities</h3>
  
                  <ul>  
                    ${detail.abilities
                      .map((result) => {
                        return `
                        <li><span>${result.nameAbility}</span>: ${result.effects[0].effect}</li>
                      `;
                      })
                      .join("")}
                  </ul>
              </div>
            </div> 
          </div>  
        </div>
      </div>
   
            `
    );

    this.pokemonData.innerHTML = pokemon;

    const btn = document.querySelector(".btn-shiny");

    btn.addEventListener("click", () => {
      changerPokemonShiny(btn);
    });

    darkMode();
    showColorPokemon();
    showNavInfoPoke();
  },
};
