import axios from 'axios'
import { Data } from './types'

const getCharacters = async () => {
  const url = 'https://rickandmortyapi.com/api/character'
  const characters = await axios.get<Data>(url)
  return characters.data.results
}

const CharactersService = { getCharacters }

export default CharactersService