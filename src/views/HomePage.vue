<template>
  <main>
    <div class="w-full bg-red-500 h-screen font-extrabold">
      <h1>Pokemons</h1>
      <ul>
        <li v-for="pokemon in pokemonList" :key="pokemon.name">
          {{ pokemon.name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getPokemonList } from '../api/pokimonApi'
import { makeApiRequest } from '../api/apiHelper'

interface PokemonType {
  name: string
  url: string
}

interface PokemonResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonType[]
}

const pokemonList = ref<PokemonType[]>([])

const fetchPokemonList = () => {
  makeApiRequest<PokemonResponse>(getPokemonList())
    .then((response) => {
      pokemonList.value = response.results
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

onBeforeMount(() => {
  fetchPokemonList()
})
</script>
