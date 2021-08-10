import React from 'react';

import { getPokemons } from './API/api';

import { Loader } from './components/Loader';
import { PokeList } from './components/PokeList/PokeList';
import { PokeDetails } from './components/PokeDetails/PokeDetails';

import './App.scss';
import './styles/general.scss';

class App extends React.Component {
  state = {
    pokeList: [],
    next20url: null,
    selectedPokeURL: '',
  };

  componentDidMount() {
    getPokemons()
      .then(pokemons => this.setState({
        pokeList: pokemons.results,
        next20url: pokemons.next,
      }));
  }

  selectPokemon = (selectedPokeURL) => {
    if (selectedPokeURL !== this.state.selectedPokeURL) {
      this.setState({ selectedPokeURL });
    }
  }

  getNextPokemons = () => {
    const { next20url } = this.state;

    getPokemons(next20url)
      .then(pokemons => this.setState(state => ({
        pokeList: [...state.pokeList, ...pokemons.results],
        next20url: pokemons.next,
      })));
  }

  render() {
    const { pokeList, selectedPokeURL } = this.state;

    if (!pokeList) {
      return <Loader />;
    }

    return (
      <div>
        <h1 className="App__title">
          Pokedex
        </h1>

        <div className="App__homepage homepage">
          <div className="homepage__list">
            <PokeList pokemons={pokeList} selectPokemon={this.selectPokemon} />

            <button
              type="button"
              className="homepage__load-more btn btn-primary"
              onClick={this.getNextPokemons}
            >
              Load More
            </button>
          </div>

          {selectedPokeURL && (
            <div className="homepage__PokeDetails">
              <PokeDetails pokemonURL={selectedPokeURL} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
