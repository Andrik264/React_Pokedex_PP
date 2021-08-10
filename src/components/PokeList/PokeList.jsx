import React from 'react';

import { PokeCard } from '../PokeCard';

import './PokeList.scss';

export const PokeList = ({ pokemons, selectPokemon }) => {
  return (
    <ul className="PokeList">
      {pokemons.map(pokemon => (
        <li
          key={pokemon.name}
          className="PokeList__item"
        >
          <div
            onClick={() => selectPokemon(pokemon.url)}
            onKeyDown={() => selectPokemon(pokemon.url)}
            role="button"
            tabIndex="0"
          >
            <PokeCard pokemon={pokemon} />
          </div>
        </li>
      ))}
    </ul>
  );
};
