import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pokemons',
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: HomePage,
    },
  ],
})

export default router
