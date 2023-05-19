
let detailsPokemon = [];

const cardsPokemons = document.querySelector(".cards-pokemons");

const fetchPokemons = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  const response = await fetch(url);
  return await response.json();
};

async function pokeDetails(poke) {
  const url = await fetchPokemons();
  const pokemons = await url.results;


  pokemons.map(async (poke) => {
    const url = poke.url;
    const response = await fetch(url);

    const pokemon = await response.json();
    detailsPokemon.push({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      id: pokemon.id,
      types: pokemon.types.map((type) =>{
           return type.type.name
      })
    });
   

    cardsPokemons.innerHTML = "";

    detailsPokemon.map((poke) => {
      showColor();

      cardsPokemons.innerHTML += `
        <div class="cartao-pokemon ${poke.types}">
        <div class="cartao-topo">
            <div class="detalhes">
                <h2 class="nome">${poke.name}</h2>
              
            </div>
            <span class="tipo">${poke.types}</span>

            <div class="cartao-imagem">
                <img src="${poke.image}" alt="${pokemon.name}">
            </div>
        </div>
        `;
    });
  });
}

pokeDetails(fetchPokemons);

function showColor() {
  const cardPokemon = document.querySelectorAll(".cartao-pokemon");

  cardPokemon.forEach((card) => {
    const type = card.classList[1];
    console.log(type);

    if (type === "fire") {
      card.classList.add("tipo-fogo");
    } else if (type == "grass") {
      card.classList.add("tipo-planta");
    } else if (type == "water") {
      card.classList.add("tipo-agua-dragao");
    } else if (type == "bug") {
      card.classList.add("tipo-inseto");
    } else if (type == "normal") {
      card.classList.add("tipo-voador");
    }
  });
}
