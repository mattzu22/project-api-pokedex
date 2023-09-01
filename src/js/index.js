import { fetchPokemons } from "./services/fetchPokemons.js";
import { screenPokemons } from "./objects/screen-pokemons.js";
import fillPokemonsDetails from "./services/fillPokemons.js";
import updateFilteredPokemon from "./functions/updateFilteredPokemon.js";
import {
  buttonSearch,
  loadPokemons,
} from "./variables.js";
import { detailsPokemon } from "./services.js";
import fetchMorePokemons from "./services/morePokemons.js";

let offset = 0;

document.getElementById("search-pokemon").addEventListener("keyup", (e) =>{
  const key = e.which || e.keyCode
  const enterKeyPressed = key === 13;
  if (enterKeyPressed) {
    updateFilteredPokemon()
  }
})

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
  const searchPokemon = document.querySelector("#search-pokemon");
  const btnSearch = document.querySelector("#search");
  const divDetalhes = document.querySelectorAll(".detalhes");
  const checkbox = document.getElementById("checkbox");
  const types = document.querySelectorAll(".tipo");
  const bgPokebola = document.querySelectorAll(".cartao-imagem");

  // Função para definir o modo dark mode
  const setDarkMode = (darkMode) => {
    localStorage.setItem("darkMode", darkMode);
  };

  // Função para aplicar o modo dark mode
  const applyDarkMode = () => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    
    searchPokemon.style.backgroundColor = darkMode ? theme.dark.backgroundLevel2 : "";
    searchPokemon.style.color = darkMode ? theme.dark.textColorBase : "";
    btnSearch.style.backgroundColor = darkMode ? theme.dark.backgroundLevel2 : "";

    divDetalhes.forEach((detalhe) => {
      detalhe.style.backgroundColor = darkMode ? theme.dark.backgroundLevel2 : "";
      detalhe.style.color = darkMode ? theme.dark.textColorBase : "";
    });

    bgPokebola.forEach((pokebola) => {
      const filterValue = darkMode ? "invert(0)" : "invert(100%)";
      pokebola.style.setProperty("--pokebola-filter", filterValue);
    });

    types.forEach((type) => {
      type.style.color = darkMode ? theme.dark.backgroundBase : "";
    });

    body.classList.toggle("selecionado", darkMode);
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


pokeDetails();

loadPokemons.addEventListener("click", () => {
  loadPokemons.classList.add("button--loading");
  
  setTimeout(() => {
    fetchMorePokemons();
    loadPokemons.classList.remove("button--loading");
  }, 1500);
});

buttonSearch.addEventListener("click", updateFilteredPokemon);
