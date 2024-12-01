import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Pokemons.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pokemon',
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: HomePage,
    },
    {
      path: '/pokemon/:pokemonId',
      name: 'pokemonDetail',
      component: () => import('../views/PokemonDetail.vue'),
      props: true,
    },
  ],
})

export default router
