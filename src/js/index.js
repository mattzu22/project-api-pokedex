let detailsPokemon = [];
const cardsPokemons = document.querySelector(".cards-pokemons");

const fetchPokemons = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=50";
  const response = await fetch(url);
  return await response.json();
};

async function pokeDetails(poke) {
  const { results} = await fetchPokemons();
  const pokemons = results;

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




    detailsPokemon.map((poke) => {
      showColorPokemon(poke);

      // function filterInputPoke(){
      //   const namePokemon = poke.name;
      //   const inputNamePokemon = document.querySelector("#name-pokemon");
      //   const valueInput = inputNamePokemon.value
      //   console.log(valueInput);
      // }

      // filterInputPoke()

      cardsPokemons.innerHTML += `
        <div class="cartao-pokemon ${poke.types.join('-')}">
            <div class="cartao-imagem">
                <img src="${poke.image}" alt="${poke.name}">
            </div>
            
            <div class="detalhes">
                <h2 class="nome">${poke.name}</h2>

                <div class="tipos">${poke.types.map((type) =>{
                  return `<span class="tipo ${type}">${type}</span>`
                })}</div>
            </div>
        </div>
        `;
    });
  };

pokeDetails(fetchPokemons);

function showColorPokemon(poke) {
  console.log(poke);
  const cardPokemon = document.querySelectorAll(".cartao-pokemon");
  const typesPokemon = document.querySelectorAll(".tipo")
  
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
    "bug-poison": "tipo-inseto-veneno"
  };

  typesPokemon.forEach((element) =>{
    const types = element.classList;
    
    types.forEach((val) =>{
      if(val in bgCardPokemon){
        element.classList.add(bgCardPokemon[val])
      }
    })
  })

  cardPokemon.forEach((card) => {
    const types = card.classList;

    types.forEach((type) => {
      if (type in bgCardPokemon) {
        card.classList.add(bgCardPokemon[type]);
      }
    });
  });
}
