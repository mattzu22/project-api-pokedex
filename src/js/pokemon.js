import { screenPokemon } from "./objects/screen-pokemon.js";
import { getDataPokemon } from "./services/getDataPokemon.js";

const urlParams = window.location.search;
const params = new URLSearchParams(urlParams);
const getUrlFlagName = params.get("name");
let detailPokemon = [];

async function fillInfoPokemon() {
  const pokemonDetails = await getDataPokemon(getUrlFlagName);

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

    screenPokemon.renderPokemon(detailPokemon);
  });
}

export async function changerPokemonShiny(btn) {
  const pokemon = await getDataPokemon(getUrlFlagName);
  const imgPokemon = document.querySelector(".img-pokemon");
  const { front_shiny: shinyPokemon, front_default: normalPokemon } =
    pokemon.sprites;
  const urlImgAtual = imgPokemon.getAttribute("src");

  const setAttributesAndAnimate = (newSrc, backgroundColor) => {
    imgPokemon.style.opacity = 0;
    btn.style.backgroundColor = backgroundColor;
    setTimeout(() => {
      imgPokemon.setAttribute("src", newSrc);
      imgPokemon.style.opacity = 1;
    }, 1000);
  };

  if (urlImgAtual === normalPokemon) {
    setAttributesAndAnimate(shinyPokemon, "green");
  } else {
    setAttributesAndAnimate(normalPokemon, "red");
  }
}

const theme = {
  light: {
    backgroundBase: "#f9f9f9",
    backgroundLevel1: "#DCDCDC",
    backgroundLevel2: "#f0f0f0",
    borderBase: "#e5e5e5",
    textColorBase: "#222222",
  },
  dark: {
    backgroundBase: "#181818",
    backgroundLevel1: "#202020",
    backgroundLevel2: "#313131",
    borderBase: "#383838",
    textColorBase: "#FFFFFF",
  },
};

export function darkMode() {
  const body = document.querySelector("body");
  const name = document.querySelector(".name");
  const number = document.querySelector(".number");
  const tipos = document.querySelectorAll(".tipo");
  const divDetails = document.querySelector(".poke-details");
  const navegation = document.querySelectorAll(".navegation ul li");
  const info = document.querySelector(".info");
  const liSelecionada = document.querySelector(".navegation ul li.selecionado");

  // Função para definir o modo dark mode
  const setDarkMode = (darkMode) => {
    localStorage.setItem("darkMode", darkMode);
  };

  // Função para aplicar o modo dark mode
  const applyDarkMode = () => {
    const darkMode = localStorage.getItem("darkMode") === "true";

    name.style.color = darkMode ? theme.dark.backgroundLevel2 : "";
    number.style.color = darkMode ? theme.dark.backgroundLevel2 : "";
    tipos.forEach((tipo) => {
      tipo.style.color = darkMode ? theme.dark.backgroundLevel2 : "";
    });
    
    liSelecionada.style.color = darkMode ? theme.dark.textColorBase : "";
    info.style.color = darkMode ? theme.dark.textColorBase : "";


    navegation.forEach((menu) => {
      menu.style.color = darkMode ? theme.dark.textColorBase : "";
    });

    divDetails.style.backgroundColor = darkMode
      ? theme.dark.backgroundLevel1
      : "";

    body.classList.toggle("selecionada", darkMode);
    checkbox.checked = darkMode;
  };

  // Chama a função para aplicar o modo dark mode quando a página é carregada
  applyDarkMode();

  checkbox.addEventListener("change", () => {
    const currentDarkMode = checkbox.checked;
    setDarkMode(currentDarkMode);
    applyDarkMode();
  });
}

fillInfoPokemon();
