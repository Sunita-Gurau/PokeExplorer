import { POKEMON_BASE_URL } from '../api/apiConstant'
import { createApiConfig } from '../api/apiHelper'
import type { AxiosRequestConfig } from 'axios'

export const getPokemonList = (): AxiosRequestConfig =>
  createApiConfig(POKEMON_BASE_URL, 'get', undefined, undefined)
