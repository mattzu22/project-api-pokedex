let detailsPokemon = [];
const cardsPokemons = document.querySelector(".cards-pokemons");
const searchInput = document.getElementById("search-pokemon");
const btn = document.getElementById("btn");

// function carregarMaisDez() {
//   detailsPokemon += fetchPokemons()
  
// }

// btn.addEventListener("click", ()=> carregarMaisDez())






const fetchPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=10`;
    const response = await fetch(url);
    const json =  await response.json();
    const { results } = json
    results.map(pokemon =>{
      const namePokemon = pokemon.name
      pokemonsData(namePokemon)
    })
  };
  
  
  const pokemonsData = async (pokemons)=>{
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemons}`
      const response = await fetch(url)
      const json = await response.json()
      console.log(json);
  }
  




//criar uma função pra filtrar o valor do input e verificar se possui dentro da api
const filteredPokemons = (inputValue) => {
  if (inputValue != "") {
    //verificar se no detailspokmeon tem o nome digitado no input
    return detailsPokemon.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(inputValue);
    });
  } else {
    //caso contrario retorne só o array detailsPokemons
    return detailsPokemon;
  }
};

//criar um função pra renderizar a lista de pokemons
function renderPokemons(pokemon) {

  pokemon.map((poke) => {
    
    cardsPokemons.innerHTML += `
    <div class="cartao-pokemon ${poke.types.join("-")}">
    <div class="cartao-imagem">
    <img src="${poke.image}" alt="${poke.name}">
    </div>
    
    <div class="detalhes">
    <h2 class="nome">${poke.name}</h2>
    
    <div class="tipos">${poke.types.map((type) => {
      return `<span class="tipo ${type}">${type}</span>`;
    })}</div>
    </div>
    </div>
    `;
    showColorPokemon(poke);
  });
}

//criar uma função que atualiza o array de pokemons
function updateFilteredPokemon() {
  //1- capturar o valor do input
  //2= passar o valor como parâmetro do filteres
  //3- passar o valor filtrado para a função que renderiza os pokemons
  const inputValue = searchInput.value.toLowerCase();
  const filterPokemons = filteredPokemons(inputValue);
  renderPokemons(filterPokemons);
}

searchInput.addEventListener("input", updateFilteredPokemon);

async function pokeDetails(poke) {

  const pokemons  = await fetchPokemons();
  console.log(pokemons);

  await Promise.all(
    pokemons.map(async (pokemonData) => {
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
    })
  );

  renderPokemons(detailsPokemon);
}

pokeDetails(fetchPokemons);

function showColorPokemon(poke) {
  const cardPokemon = document.querySelectorAll(".cartao-pokemon");
  const typesPokemon = document.querySelectorAll(".tipo");



  const bgCardPokemon = {
    fire: "tipo-fogo",
    grass: "tipo-planta",
    water: "tipo-agua-dragao",
    bug: "tipo-inseto",
    normal: "tipo-voador",
    poison: "tipo-venenoso",
    flying: "tipo-voador",
    ground: "tipo-terra",
    electric: "tipo-eletrico",
    fairy: "tipo-fada",
    "normal-fairy": "tipo-normal-fada",
    "poison-flying": "tipo-veneno-voador",
    "poison-ground": "tipo-veneno-terra",
    "grass-poison": "tipo-planta-veneno",
    "fire-flying": "tipo-voador-fire",
    "bug-flying": "tipo-inseto-voador",
    "normal-flying": "tipo-normal-voador",
    "bug-poison": "tipo-inseto-veneno",
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
