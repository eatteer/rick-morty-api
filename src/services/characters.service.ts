import axios from 'axios'
import { CharacterDto } from '../entities/CharacterDto'

export const getCharacters = async (): Promise<CharacterDto[]>  => {
  const url = 'https://rickandmortyapi.com/api/character'
  const characters = await axios.get(url)
  return characters.data.results as CharacterDto[]
}