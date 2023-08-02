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

 export default showColorPokemon