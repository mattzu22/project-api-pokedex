import { fetchPokemons } from "./fetchPokemons";
import { expect, test } from "vitest";

test("A função fetchPokemons deve retornar uma lista de 10 pokemons", async () => {
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
  globalThis.fetch = async () => mockResponse;

  const pokemons = await fetchPokemons(0);

  expect(pokemons).toHaveLength(10);
});
