const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const request = (url) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getPokemons = (next20url) => {
  if (next20url) {
    return request(`${next20url}`);
  }

  return request(API_URL);
};

export const getPokemon = (url) => {
  return request(url);
};
