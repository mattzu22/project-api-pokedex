let detailsPokemon = [];
const cardsPokemons = document.querySelector(".cards-pokemons");
const searchInput = document.getElementById("search-pokemon");
const buttonSearch = document.getElementById("search");
const loadPokemons = document.getElementById("btn");
let offset = 0;
const limit = 10;

const fetchPokemons = async (offSet) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offSet}`;
  const response = await fetch(url);
  return await response.json();
};

const filteredPokemons = (inputValue) => {
  if (inputValue !== "") {
    return detailsPokemon.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(inputValue);
    });
  } else {
    return detailsPokemon;
  }
};

loadPokemons.addEventListener("click", () => {
  loadPokemons.classList.add("clicado");
});

function updateFilteredPokemon() {
  const inputValue = searchInput.value.toLowerCase();
  const filterPokemons = filteredPokemons(inputValue);
  renderPokemons(filterPokemons);
}

buttonSearch.addEventListener("click", updateFilteredPokemon);

function renderPokemons(pokemon) {
  let pokemons = pokemon.map(
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
              .join("")}</div>
          </div>
         </div>.
    `
  );
  cardsPokemons.innerHTML = "";
  cardsPokemons.innerHTML += pokemons;

  showColorPokemon();
}

async function pokeDetails() {
  const data = await fetchPokemons(offset);
  const { results } = data;

  await Promise.all(
    results.map(async (pokemonData) => {
      await fillPokemonsDetails(pokemonData);
    })
  );

  renderPokemons(detailsPokemon);
}

function fetchMorePokemons() {
  offset += limit;
  fetchPokemons(offset).then((data) => {
    const { results } = data;
    results.map(async (pokemonData) => {
      await fillPokemonsDetails(pokemonData);
    });
  });

  renderPokemons(detailsPokemon);
}

async function fillPokemonsDetails(pokemonData) {
  const url = pokemonData.url;
  const response = await fetch(url);
  const pokemon = await response.json();

  const types = pokemon.types.map((type) => type.type.name);

  detailsPokemon.push({
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    id: pokemon.id,
    types: types,
  });
}

loadPokemons.addEventListener("click", fetchMorePokemons);

pokeDetails();

function showColorPokemon() {
  const cardPokemon = document.querySelectorAll(".cartao-pokemon");
  const typesPokemon = document.querySelectorAll(".tipo");

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
