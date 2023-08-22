import showColorPokemon from "../functions/showColorPokemons.js";

export const scrennPokemon = {
  pokemonData: document.querySelector(".container-pokemons"),

  renderPokemons(detailPokemon) {
    let pokemon = detailPokemon.map((detail, index) => {
      `
          <div class="detail-pokemon">
            <div class="info-right ${detail.types.join("-")} cartao-pokemon">
              <div class="info-pokemon">
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
        
            <div class="container-poke-details">
                <img src=${detail.image} class="img-pokemon"/>
                    
                <div class="poke-details">
                  <nav class="navegation">
                    <ul>
                      <li class="selecionado" id=${index}>Status</li>
                      <li id=${index}>Habilidades</li>
                      <li id=${index}>Moves</li>
                    </ul>
                  </nav>
        
                  <div class="info">    
                    <div class="status" id="status-0">
                      <h3>Status</h3>
        
                      <ul>
                        ${detail.stats
                          .map((stat) => {
                            return `<li>${stat.nameStats}: ${stat.baseStats}</li>`;
                          })
                          .join("")}
                      </ul>
                    </div>
                  
        
                    <div class="moves" id="moves-1">
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
        
                    <div class="abilities" id="abilities-2">
                        <h3>Abilities</h3>
        
                        <ul>  
                          ${detail.abilities
                            .map((result) => {
                              return `
                              <li>${result.nameAbility}: ${result.effects[0].effect}</li>
                            `;
                            })
                            .join("")}.
                        </ul>
                    </div>
                  </div> 
                </div>  
              </div>
            </div>
          </div>  
            `;
    });

    this.pokemonData.innerHTML = "",
    this.pokemonData.innerHTML += pokemon

    // const btnShiny = document.querySelector(".btn-shiny");

    // btnShiny.addEventListener("click", () => {
    //   changerPokemonShiny(btnShiny);
    // });

    showColorPokemon();
  },
};
