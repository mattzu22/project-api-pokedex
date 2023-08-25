import { getDataPokemon } from "./getDataPokemon";
import { expect, test } from "vitest";

test("A função deve retornar um objeto com informações de um pokemon específico", async()=>{
    const mockResponse = {
        json: async()=> [
            {
                name: "pikachu",
                type: "eletric",
            }
        ]
    }

    globalThis.fetch = async()=> mockResponse

    const pokemon = await getDataPokemon(0);

    expect(pokemon).toHaveLength(1)
})