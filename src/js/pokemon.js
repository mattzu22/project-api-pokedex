
import showColorPokemon from "./functions/showColorPokemons.js";

const urlParams = window.location.search;
const params = new URLSearchParams(urlParams);
const getUrlFlagName = params.get("name");
let detailPokemon = [];
let containerDetailsPokemon = document.querySelector(".container-pokemons");

async function getDetailsPokemon(pokemom) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemom}`;
  const response = await fetch(url);
  const pokemonDetails = await response.json();

  const infoStats = pokemonDetails.stats.map((stat) => {
    const nameStats = stat.stat.name;
    const baseStats = stat.base_stat;
    return { nameStats, baseStats };
  });

  const { moves } = pokemonDetails;
  const movesSelect = moves.slice(0, 4);

  const { abilities } = pokemonDetails;

  const types = pokemonDetails.types.map((type) => type.type.name);

  const urlAbilityPromises = abilities.map(async (ability) => {
    const urlAbility = ability.ability.url;
    const response = await fetch(urlAbility);
    const json = await response.json();
    return {
      nameAbility: ability.ability.name,
      effects: json.effect_entries.filter((entry) => entry.language.name === "en"),
    };
  });

  Promise.all(urlAbilityPromises).then((abilityResults) => {
    detailPokemon.push({
      image: pokemonDetails.sprites.front_default,
      id: pokemonDetails.id,
      name: pokemonDetails.name,
      types: types,
      movesSelect: movesSelect,
      stats: infoStats,
      abilities: abilityResults,
    })

    renderPokemon(detailPokemon);
  });
}

getDetailsPokemon(getUrlFlagName);

function renderPokemon(detailPokemon) {
  console.log(detailPokemon);
  detailPokemon.map((detail, index) => {
    containerDetailsPokemon.innerHTML += `
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
                  ${detail.abilities.map( result =>{
                    return `
                      <li>${result.nameAbility}: ${result.effects[0].effect}</li>
                    `
                  }).join("")}.
                </ul>
            </div>
          </div> 
        </div>  
      </div>
    </div>
  </div>  
    `;
  });

  // const btnShiny = document.querySelector(".btn-shiny");

  // btnShiny.addEventListener("click", () => {
  //   changerPokemonShiny(btnShiny);
  // });

  showColorPokemon();
}

async function changerPokemonShiny(btn) {
  const pokemon = await getDetailsPokemon(getUrlFlagName);
  const imgPokemon = document.querySelector(".img-pokemon");
  const shinyPokemon = pokemon.sprites.front_shiny;
  const normalPokemon = pokemon.sprites.front_default;
  const urlImgAtual = imgPokemon.getAttribute("src");

  if (urlImgAtual === normalPokemon) {
    imgPokemon.style.opacity = 0;
    btn.style.backgroundColor = "green";
    setTimeout(() => {
      imgPokemon.setAttribute("src", shinyPokemon);
      imgPokemon.style.opacity = 1;
    }, 200);
  } else {
    imgPokemon.style.opacity = 0;
    btn.style.backgroundColor = "red";
    setTimeout(() => {
      imgPokemon.setAttribute("src", normalPokemon);
      imgPokemon.style.opacity = 1;
    }, 200);
  }
}
