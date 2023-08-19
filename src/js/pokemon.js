const urlParams = window.location.search;
const params = new URLSearchParams(urlParams);
const getUrlFlagName = params.get("name");
let detailPokemon = [];
let containerDetailsPokemon = document.querySelector(".container-pokemons");

async function getDetailsPokemon(pokemom) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemom}`;
  const response = await fetch(url);
  return await response.json();
}

async function renderPokemon() {
  const pokemon = await getDetailsPokemon(getUrlFlagName);

  const infoStats = pokemon.stats.map((stat) => {
    const nameStats = stat.stat.name;
    const baseStats = stat.base_stat;
    return { nameStats, baseStats };
  });

  const { moves } = pokemon;
  const movesSelect = moves.slice(0, 4);

  const { abilities } = pokemon;

  const nameAbilities = abilities.map((ability) => ability.ability.name);

  const urlAbilityPromises = abilities.map(async (ability) => {
    const nameAbility = ability.ability.name;
    const urlAbility = ability.ability.url;
    const response = await fetch(urlAbility);
    const json = await response.json();
    const description = json.effect_entries;
    const descriptionAbility = description
      .filter((val) => val.language.name === "en")
      .map((val) => ({
        nameAbility: nameAbility,
        effect: val.effect,
      }));
    return descriptionAbility;
  });

  Promise.all(urlAbilityPromises).then((results) => {
    results.map((result) => {
      detailPokemon.push({
        nameAbility: result[0].nameAbility,
        effect: result[0].effect,
      });
    });
  });

  const types = pokemon.types.map((type) => type.type.name);

  detailPokemon.push({
    image: pokemon.sprites.front_default,
    id: pokemon.id,
    name: pokemon.name,
    types: types,
    movesSelect: movesSelect,
    stats: infoStats,
  });

  detailPokemon.map((detail) => {
    containerDetailsPokemon.innerHTML += `
    <div class="detail-pokemon">
    <div class="info-right ${detail.types.join("-")}">
      <div class="info-pokemon">
        <div class="name-type">
          <h2 class="name">${detail.name}</h2>
          <div class="types">${detail.types
            .map((type) => {
              return `<span class="type ${type}">${type}</span>`;
            })
            .join("")}</div>
          </div>  
        <p class="number">#00${detail.id}</p>

        <button class="btn-shiny"></button>
      </div>

      <div class="container-poke-details">
        <img src=${detail.image} class="img-pokemon"/>
            
        <div class="poke-details">
          <nav>
            <ul>
              <li>Status</li>
              <li>Habilidades</li>
              <li>Moves</li>
            </ul>
          </nav>

          <div class="status">
            <h3>Status</h3>

            <ul>
              ${detail.stats
                .map((stat) => {
                  return `<li>${stat.nameStats}: ${stat.baseStats}</li>`;
                })
                .join("")}
            </ul>
          </div>
         

          <div class="abilities">
              <h3>Habilidades</h3>

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
        </div>  
      </div>
    </div>
  </div>  
    `;
  });

  const btnShiny = document.querySelector(".btn-shiny");

  btnShiny.addEventListener("click", () => {
    changerPokemonShiny(btnShiny);
  });

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

renderPokemon();

function showColorPokemon() {
  const cardPokemon = document.querySelectorAll(".info-right");
  const typesPokemon = document.querySelectorAll(".type");

  const bgCardPokemon = {
    fire: "tipo-fogo",
    grass: "tipo-planta",
    water: "tipo-agua",
    bug: "tipo-inseto",
    normal: "tipo-normal",
    poison: "tipo-venenoso",
    flying: "tipo-voador",
    ground: "tipo-terra",
    electric: "tipo-eletrico",
    fairy: "tipo-fada",
    fighting: "tipo-lutador",
    psychic: "tipo-psiquico",
    "water-poison": "tipo-agua-veneno",
    "water-fighting": "tipo-agua-lutador",
    "normal-fairy": "tipo-normal-fada",
    "poison-flying": "tipo-veneno-voador",
    "poison-ground": "tipo-veneno-terra",
    "grass-poison": "tipo-planta-veneno",
    "fire-flying": "tipo-voador-fire",
    "bug-flying": "tipo-inseto-voador",
    "normal-flying": "tipo-normal-voador",
    "bug-poison": "tipo-inseto-veneno",
    "bug-grass": "tipo-inseto-planta",
  };

  typesPokemon.forEach((element) => {
    const types = element.classList;

    types.forEach((val) => {
      if (val in bgCardPokemon) {
        element.classList.add(bgCardPokemon[val]);
      }
    });
  });

  cardPokemon.forEach((card) => {
    const types = card.classList;

    types.forEach((type) => {
      if (type in bgCardPokemon) {
        card.classList.add(bgCardPokemon[type]);
      }
    });
  });
}

// ${detail.nameAbilities
//   .map((ability) => {
//     return `<p>${ability}</p>`;
//   })
//   .join(" ")}