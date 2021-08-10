import React from 'react';

import { getPokemon } from '../../API/api';
import { Loader } from '../Loader';

import './PokeDetails.scss';

export class PokeDetails extends React.Component {
  state = {
    pokemon: null,
  }

  async componentDidMount() {
    const { pokemonURL } = this.props;

    const pokemon = await getPokemon(pokemonURL);

    this.setState({ pokemon });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.pokemonURL !== this.props.pokemonURL) {
      const pokemon = await getPokemon(this.props.pokemonURL);

      this.setState({ pokemon });
    }
  }

  render() {
    const { pokemon } = this.state;

    if (!pokemon) {
      return <Loader />;
    }

    return (
      <div className="PokeDetails">
        <div className="PokeDetails__img-block">
          <img
            className="PokeDetails__image"
            src={pokemon.sprites.front_default}
            alt="Random thing"
          />
        </div>

        <h2 className="PokeDetails__name">
          {pokemon.name}
        </h2>

        <div className="PokeDetails__stats">
          <table className="table">
            <tbody className="table__body">
              {pokemon.types.map(type => (
                <tr key={type.slot} className="table__row">
                  <td className="table__column table__column--name">
                    Type
                  </td>

                  <td className="table__column">
                    {type.type.name}
                  </td>
                </tr>
              ))}

              {pokemon.stats.map((item) => {
                const { stat } = item;

                return (
                  <tr key={stat.name} className="table__row">
                    <td className="table__column table__column--name">
                      {stat.name}
                    </td>

                    <td className="table__column">
                      {item.base_stat}
                    </td>
                  </tr>
                );
              })}

              <tr className="table__row">
                <td className="table__column table__column--name">
                  Weight
                </td>

                <td className="table__column">
                  {pokemon.weight}
                </td>
              </tr>

              <tr className="table__row">
                <td className="table__column table__column--name">
                  total moves
                </td>

                <td className="table__column">
                  {pokemon.moves.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
