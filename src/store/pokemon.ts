/* eslint-disable @typescript-eslint/no-explicit-any */
// store/modules/pokemon.ts

const pokemon = {
  namespaced: true,
  state: {
    PokemonDetailList: [],
    originalPokemonList: [],
  },
  mutations: {
    ADD_POKEMON_DETAIL(state: any, detail: any) {
      state.PokemonDetailList.push(detail)
    },
    ORIGINAL_POKEMON_LIST(state: any, detail: any) {
      state.originalPokemonList = detail
    },
  },
  actions: {},
}

export default pokemon
