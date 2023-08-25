import fillPokemonsDetails from "./fillPokemons.js";
import { expect, test } from "vitest";


test("a função deve receber um parámetro contendo um array com algumas informações de 10 pokemons e preencher uma variável com essas informações", ()=>{
    let detailsPokemons = [];
    const mockResponse = {
        json: async () => [
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
          { nome: "Pikachu", type: "eletric" },
        ],
      };
})