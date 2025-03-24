import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePokemonStore = defineStore('pokemonStore', () => {
  const pokemonDetailList = ref<any>([])
  const originalPokemonList = ref<any>([])

  const setOriginalPokemonList = (list) => {
    originalPokemonList.value = list
  }

  return {
    pokemonDetailList,
    originalPokemonList,
    setOriginalPokemonList,
  }
})