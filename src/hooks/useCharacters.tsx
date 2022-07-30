import { useEffect, useRef, useState } from 'react'
import FavoritesService from '../services/FavoritesService'
import CharactersService from '../services/CharactersService'
import { Character } from '../services/types'

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const favorites = useRef<Character[]>([])

  useEffect(() => {
    ;(async () => {
      favorites.current = FavoritesService.loadFavoritesFromLocalStorage()
      /* Originally the characters returned by the API do not have the [isFavorite] property.
      This property is added by declaration merging, so characters returned by [getCharacters]
      have [characterFromAPI.isFavorite === undefined] */
      const charactersFromAPI = await CharactersService.getCharacters()
      /* Config characters consists of intersecting [favorites.current] and [charactersFromAPI].
      This way the returned characters are formed by setting [character.isFavorite] to [true] if is found in [favorites.current] 
      or [false] if not */
      const characters = FavoritesService.configCharacters(
        favorites.current,
        charactersFromAPI
      )
      setCharacters(characters)
    })()
  }, [])

  return { characters, favorites, setCharacters }
}

export default useCharacters
