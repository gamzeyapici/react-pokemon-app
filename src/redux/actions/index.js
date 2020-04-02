import * as types from '../constants'

export const setPokemonItems = items => ({ type: types.SET_POKEMON_ITEMS, items });
export const setPokemonDetail = detail => ({ type: types.SET_POKEMON_DETAIL, detail });

export const fetchPokemonItems = () => (dispatch)  => {
  return fetch('https://api.pokemontcg.io/v1/cards?pageSize=1000')
            .then(res => res.json())
            .then(res => {
              dispatch(setPokemonItems(res.cards));
            })
};

export const fetchPokemonDetail = (id) => (dispatch)  => {
  return fetch('https://api.pokemontcg.io/v1/cards/' + id)
            .then(res => res.json())
            .then(res => {
                dispatch(setPokemonDetail(res.card));                
            });
};
