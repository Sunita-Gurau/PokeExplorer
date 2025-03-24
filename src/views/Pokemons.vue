<template>
  <div class="">
    <!-- {{ pokemonStore.originalPokemonList }} -->
{{ pokemonStore.originalPokemonList.length }}
    <div class="w-full mb-4">
      <SearchBar v-model="searchPokemon" placeholder="Search for Pokemon..." />
    </div>
    <div
      v-if="isLoading"
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
    >
      <div v-for="pokemon in 100" :key="pokemon" role="status" class="animate-pulse">
        <div class="flex h-48 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
          <Icon iconName="ImageSkeleton" />
        </div>
      </div>
    </div>

    <div
      v-if="pokemonList.length"
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
    >
      <figure
        v-for="pokemon in pokemonList"
        :key="pokemon.name"
        class="relative group overflow-hidden cursor-pointer"
        :class="getRandomBgColor()"
        @click="handleViewDetail(Number(pokemon.id))"
      >
        <img
          :src="pokemon.image"
          :alt="`pokemon by ${pokemon.name}`"
          loading="lazy"
          class="w-full h-full group-hover:scale-125 poke-transition"
        />
        <figcaption
          class="flex w-full p-3 absolute -bottom-20 left-0 bg-slate-900/60 text-white justify-between items-center invisible group-hover:bottom-0 group-hover:visible transition-all duration-500"
        >
          <div class="flex flex-col gap-y-2">
            <p class="text-lg font-semibold">{{ convertToTitleCase(pokemon.name) }}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
  <div v-if="!pokemonList.length && !isLoading" class="h-80 flex justify-center items-center">
    <div>
      <Icon iconName="NoData" svgFill="stroke-gray-400" />
      <p class="text-base text-gray-500 my-4">No data Found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { getPokemonList } from '../api/pokimonApi'
import { makeApiRequest } from '../api/apiHelper'
import debounce from 'lodash/debounce'
import Icon from '../components/SharedComponents/Icon.vue'
import SearchBar from '../components/SharedComponents/SearchBar.vue'
import { useRouter } from 'vue-router'
import { convertToTitleCase } from '../utils/stringMaskingUtils'
import { usePokemonStore } from '../store/index'

interface PokemonType {
  name: string
  url: string
  image: string
  id: number
}

interface PokemonResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonType[]
}
const $router = useRouter()
const pokemonStore = usePokemonStore()

const pokemonList = ref<PokemonType[]>([])
const originalPokemonList = ref<PokemonType[]>([])
const isLoading = ref<boolean>(false)
const searchPokemon = ref<string>('')

const fetchPokemonList = async () => {
  isLoading.value = true
  const params = { limit: 1302, offset: 0 }
  try {
    const response = await makeApiRequest<PokemonResponse>(getPokemonList(params))
    const allPokemonDetails = await Promise.all(
      response.results.map(async (pokemon) => {
        const details = await fetchPokemonDetails(pokemon.url)
    

        return {
          ...pokemon,
          image: details.sprites.front_default,
          id: details.id,
        }
      }),
    )
    pokemonList.value = allPokemonDetails
    originalPokemonList.value = allPokemonDetails
      pokemonStore.setOriginalPokemonList(allPokemonDetails);
  } catch (error) {
    console.log(error, 'error')
  } finally {
    isLoading.value = false
  }
}

const fetchPokemonDetails = async (url: string) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data) {
      console.log(data,"details");
      // pokemonStore.setPokemonDetails(data);
    }
    return data
  } catch (error) {
    console.log('Error fetching Pokémon details:', error)
    return null
  }
}

const getRandomBgColor = () => {
  const colors = [
    'bg-red-300',
    'bg-primary-500',
    'bg-green-300',
    'bg-yellow-300',
    'bg-purple-300',
    'bg-indigo-300',
    'bg-teal-300',
    'bg-pink-300',
  ]
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const filterPokemon = () => {
  const search = searchPokemon.value.toLowerCase().trim()
  if (search === '') {
    pokemonList.value = [...originalPokemonList.value]
  } else {
    pokemonList.value = originalPokemonList.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search),
    )
  }
}

const handleViewDetail = (pokemonId: number) => {
  $router.push({
    name: 'pokemonDetail',
    params: { pokemonId: pokemonId },
  })
}

const debouncedFilterPokemon = debounce(filterPokemon, 300)

watch(searchPokemon, debouncedFilterPokemon)

onMounted(() => {
  fetchPokemonList()
// if (pokemonStore.originalPokemonList.length === 0) {
//     fetchPokemonList()
//   } else {
//     pokemonList.value = [...pokemonStore.originalPokemonList]
//     originalPokemonList.value = [...pokemonStore.originalPokemonList]  }
})
</script>
