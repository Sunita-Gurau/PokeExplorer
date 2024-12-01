import { POKEMON_BASE_URL, POKEMON_DETAIL } from '../api/apiConstant'
import { createApiConfig } from '../api/apiHelper'
import type { AxiosRequestConfig } from 'axios'

export const getPokemonList = (params: { limit: number; offset: number }): AxiosRequestConfig =>
  createApiConfig(POKEMON_BASE_URL, 'get', params, undefined)

export const getPokemonDetail = (params: { id: number }): AxiosRequestConfig => {
  const url = POKEMON_DETAIL(params.id)
  return createApiConfig(url, 'get', undefined, undefined)
}
