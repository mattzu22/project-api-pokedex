import { fetchPokemons } from "./fetchPokemons";

const mockApiResponse = [
    { name: 'Pikachu', type: 'Electric' },
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Bulbasaur', type: 'Grass' },
  ];
  
  // Mock da função fetch para retornar a resposta mockada
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockApiResponse),
    })
  );
  
 
    it('Deve retornar uma lista de 10 pokémons', async () => {
      const offSet = 0;
      const pokemons = await fetchPokemons(offSet);
  
      expect(pokemons).toHaveLength(10);
      expect(pokemons[0].name).toBe('Pikachu');
      expect(pokemons[0].type).toBe('Electric');
    });