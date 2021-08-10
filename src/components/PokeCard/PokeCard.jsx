import React from 'react';
import { getPokemon } from '../../API/api';
import { Loader } from '../Loader';

import './Pokecard.scss';

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

export class PokeCard extends React.Component {
  state = {
    pokeInfo: null,
  }

  async componentDidMount() {
    const { pokemon } = this.props;

    const pokeInfo = await getPokemon(pokemon.url);

    this.setState({
      pokeInfo,
    });
  }

  render() {
    const { pokeInfo } = this.state;

    if (!pokeInfo) {
      return <Loader />;
    }

    return (
      <div
        className="PokeCard"
      >
        <div className="PokeCard__img-block">
          <img
            src={pokeInfo.sprites.front_default}
            alt="pokemon"
            className="PokeCard__image"
          />
        </div>

        <div className="PokeCard__info-block">
          <h2 className="PokeCard__name">
            {pokeInfo.name}
          </h2>

          <div className="PokeCard__types">
            {pokeInfo.types.map(type => (
              <div
                key={type.slot}
                className="PokeCard__type"
                style={{ backgroundColor: colors[type.type.name] }}
              >
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
