/* eslint-disable @typescript-eslint/no-explicit-any */
// store/modules/pokemon.ts

const pokemon = {
  namespaced: true,
  state: {
    PokemonDetailList: [],
  },
  mutations: {
    ADD_POKEMON_DETAIL(state: any, detail: any) {
      state.PokemonDetailList.push(detail)
    },
  },
  actions: {},
}

export default pokemon
