import {
  SET_POKEMON_ITEMS,
  SET_POKEMON_DETAIL,
} from '../constants'

const initialState = {
  items: [],
  detail: null,
};

export default function pokemons(state = initialState, action) {
  switch (action.type) {
    case SET_POKEMON_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case SET_POKEMON_DETAIL:
      return {
        ...state,
        detail: action.detail
      };
    default:
      return state
  }
}
