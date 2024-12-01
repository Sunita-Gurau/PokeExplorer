<template>
  <div class="bg-primary-700 w-full h-screen p-4">
    <router-link
      to="/pokemon"
      class="-rotate-90 h-10 w-10 bg-white rounded-full flex justify-center items-center cursor-pointer"
    >
      <Icon iconName="Arrow" svgFill="stroke-primary-700" />
    </router-link>
    <div class="flex items-center justify-center">
      <div v-if="pokemonDetail" class="text-center">
        <Header :headingLevel="'h2'" :text="`Details for ${pokemonDetail.name}`" />
        <img
          :src="pokemonDetail.sprites.front_default"
          alt="pokemon image"
          class="w-48 h-48 mt-4"
        />
        <p class="mt-2 text-lg">ID: {{ pokemonDetail.id }}</p>
        <p class="text-lg">Name: {{ pokemonDetail.name }}</p>
      </div>
      <div v-else>
        <Header headingLevel="h2" text="No Pokémon details found." />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/SharedComponents/Header.vue'
import Icon from '../components/SharedComponents/Icon.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { onBeforeMount, ref } from 'vue'
import { toRaw } from 'vue'
import { makeApiRequest } from '../api/apiHelper'
import { getPokemonDetail } from '../api/pokimonApi'

interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
}

const $route = useRoute()
const $store = useStore()
const pokemonId = Number($route.params.pokemonId)
const pokemonDetail = ref<Pokemon | null>(null)

const fetchPokemonDetail = () => {
  const params = {
    id: pokemonId,
  }
  makeApiRequest<any>(getPokemonDetail(params))
    .then((response) => {
      pokemonDetail.value = response
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

onBeforeMount(() => {
  if ($store.state.pokemon.PokemonDetailList.length === 0) {
    fetchPokemonDetail()
  } else {
    const list = Array.isArray(toRaw($store.state.pokemon.PokemonDetailList))
      ? toRaw($store.state.pokemon.PokemonDetailList)
      : []
    pokemonDetail.value = list.find((pokemon: Pokemon) => pokemon.id === pokemonId) || null
  }
})
</script>
