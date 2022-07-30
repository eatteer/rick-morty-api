import FavoritesService from '../services/FavoritesService'
import { Character } from '../services/types'
import useCharacters from '../hooks/useCharacters'
import CharacterList from '../components/CharacterList'
import Logo from '../components/Logo'

export const Home = () => {
  const { characters, favorites, setCharacters } = useCharacters()

  /* TODO: Refactor logic inside [onClick] by dividing responsibilities*/
  const onClick = (characterToModify: Character) => {
    /* Update characters */
    const updatedCharacters = characters.map((characters) => {
      /* Modify character if its favorite button was clicked */
      if (characters.id === characterToModify.id) {
        const { isFavorite } = characterToModify
        const updatedCharacter = {
          ...characterToModify,
          isFavorite: !isFavorite,
        }
        /* Favorite button was clicked, right?
        Then if the character is favorite then remove it from [favorites.current]
        else add it. This is toggling! */
        if (isFavorite) {
          favorites.current = favorites.current.filter((favorite) => {
            return favorite.id !== updatedCharacter.id
          })
        } else {
          favorites.current.push(updatedCharacter)
        }
        return updatedCharacter
      }

      /* Do not modify character that was not clicked */
      return characters
    })
    /* Save favorite characters to local storage */
    FavoritesService.saveFavoritesToLocalStorage(favorites.current)
    /* Update characters state */
    setCharacters(updatedCharacters)
  }

  return (
    <div className='max-w-5xl m-auto p-4'>
      <Logo />
      <CharacterList characters={characters} onClick={onClick} />
    </div>
  )
}

export default Home
