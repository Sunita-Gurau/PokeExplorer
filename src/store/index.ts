import { createStore } from 'vuex'
import pokemon from './pokemon'

const store = createStore({
  modules: {
    pokemon,
  },
})

export default store
