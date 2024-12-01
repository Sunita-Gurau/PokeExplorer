import { POKEMON_BASE_URL } from '../api/apiConstant'
import { createApiConfig } from '../api/apiHelper'
import type { AxiosRequestConfig } from 'axios'

export const getPokemonList = (params: { limit: number; offset: number }): AxiosRequestConfig =>
  createApiConfig(POKEMON_BASE_URL, 'get', params, undefined)
