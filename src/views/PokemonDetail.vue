<template>
  <div class="bg-primary-500 w-full h-screen p-4">
    <!-- Back to Pokemon List Button -->
    <router-link
      to="/pokemon"
      class="-rotate-90 h-10 w-10 bg-white rounded-full flex justify-center items-center cursor-pointer"
    >
      <Icon iconName="Arrow" svgFill="stroke-primary-700" />
    </router-link>

    <div class="flex items-center justify-center">
      <div
        class="flex bg-white poke-scrollbar overflow-y-auto mx-auto w-[600px]"
        :style="{ height: 'calc(100vh - 120px)' }"
      >
        <div
          v-if="pokemonDetail"
          class="w-full p-4 bg-white rounded-lg shadow-md mx-auto max-w-4xl"
        >
          <!-- Header Section -->
          <div class="bg-primary-700 p-4 text-white text-center rounded-t-lg">
            <Header :headingLevel="'h2'" :text="convertToTitleCase(pokemonDetail.name)" />
          </div>

          <!-- Image and Basic Info Section -->
          <div
            class="flex flex-col md:flex-row items-center md:items-start md:justify-between mt-4"
          >
            <div class="flex justify-center items-center md:w-1/3">
              <img
                v-if="pokemonDetail.sprites?.front_default"
                :src="pokemonDetail.sprites.front_default"
                alt="Pokemon image"
                class="w-48 h-48"
              />
              <div
                v-else
                class="w-48 h-48 bg-gray-300 flex justify-center items-center text-gray-600"
              >
                No Image Available
              </div>
            </div>

            <div class="md:w-2/3 text-primary-700 mt-4 md:mt-0 md:ml-6">
              <Header
                :headingLevel="'h4'"
                :text="`Name: ${convertToTitleCase(pokemonDetail.name)}`"
              />
              <p class="mt-2 text-lg">
                ID: <span class="font-bold">{{ pokemonDetail.id || 'N/A' }}</span>
              </p>
              <p class="text-lg">
                Height:
                <span class="font-bold">{{ pokemonDetail.height || 'N/A' }}</span> decimetres
              </p>
              <p class="text-lg">
                Weight:
                <span class="font-bold">{{ pokemonDetail.weight || 'N/A' }}</span> hectograms
              </p>
              <p class="text-lg">
                Base Experience:
                <span class="font-bold">{{ pokemonDetail.base_experience || 'N/A' }}</span>
              </p>
            </div>
          </div>

          <!-- Types and Abilities Section -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Type Section -->
            <div class="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-2">Types</h3>
              <ul class="list-disc pl-6">
                <li v-for="type in pokemonDetail.types || []" :key="type.type.name">
                  {{ convertToTitleCase(type.type.name) }}
                </li>
                <li v-if="pokemonDetail.types?.length === 0">No Types Available</li>
              </ul>
            </div>

            <!-- Abilities Section -->
            <div class="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-2">Abilities</h3>
              <ul class="list-disc pl-6">
                <li v-for="ability in pokemonDetail.abilities || []" :key="ability.ability.name">
                  {{ convertToTitleCase(ability.ability.name) }}
                </li>
                <li v-if="pokemonDetail.abilities?.length === 0">No Abilities Available</li>
              </ul>
            </div>
          </div>

          <!-- Moves Section -->
          <div class="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold mb-4">Moves</h3>
            <ul class="list-disc pl-6 grid grid-cols-2 md:grid-cols-3 gap-2">
              <li v-for="move in pokemonDetail.moves || []" :key="move.move.name">
                {{ convertToTitleCase(move.move.name) }}
              </li>
              <li v-if="pokemonDetail.moves?.length === 0">No Moves Available</li>
            </ul>
          </div>
        </div>

        <div v-else>
          <Header headingLevel="h2" text="No Pokémon details found." />
        </div>
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
import { convertToTitleCase } from '../utils/stringMaskingUtils'

interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  height?: number
  weight?: number
  base_experience?: number
  types: Array<{ type: { name: string } }>
  abilities: Array<{ ability: { name: string } }>
  moves: Array<{ move: { name: string } }>
}

const $route = useRoute()
const $store = useStore()
const pokemonId = Number($route.params.pokemonId)
const pokemonDetail = ref<Pokemon | null>(null)

const fetchPokemonDetail = () => {
  const params = {
    id: pokemonId,
  }
  makeApiRequest<Pokemon>(getPokemonDetail(params))
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
