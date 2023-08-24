import { screenPokemon } from "./objects/screen-pokemon.js";

const urlParams = window.location.search;
const params = new URLSearchParams(urlParams);
const getUrlFlagName = params.get("name");
let detailPokemon = [];

async function getDataPokemon(pokemom) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemom}`;
  const response = await fetch(url);
  return await response.json();
}

async function getInfoPokemon() {
  const pokemonDetails = await getDataPokemon(getUrlFlagName)

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
      effects: json.effect_entries.filter(
        (entry) => entry.language.name === "en"
      ),
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
    });

    screenPokemon.renderPokemon(detailPokemon)
  });
}

getInfoPokemon()

export async function changerPokemonShiny(btn) {
  const pokemon = await getDataPokemon(getUrlFlagName);
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
