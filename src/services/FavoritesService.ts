import { Character } from "./types"

const FAVORITES_KEY = 'favorites'

const loadFavoritesFromLocalStorage = (): Character[] => {
  const rawFavorites = localStorage.getItem(FAVORITES_KEY)
  if (rawFavorites) {
    const parsedFavorites = JSON.parse(rawFavorites)
    return parsedFavorites
  }
  return []
}

const saveFavoritesToLocalStorage = (favorites: Character[]) => {
  localStorage.setItem(
    FavoritesService.FAVORITES_KEY,
    JSON.stringify(favorites)
  )
}

const configCharacters = (favorites: Character[], characters: Character[]) => {
  return characters.map((character) => {
    const isFavorite = favorites.find((favorite) => {
      return favorite.id === character.id
    })
    character.isFavorite = Boolean(isFavorite)
    return character
  })
}

const FavoritesService = {
  FAVORITES_KEY,
  loadFavoritesFromLocalStorage,
  saveFavoritesToLocalStorage,
  configCharacters
}

export default FavoritesService