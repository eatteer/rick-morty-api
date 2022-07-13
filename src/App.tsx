import { FC, useEffect, useRef, useState } from 'react'
import { Card } from './components/Card'
import { Character } from './entities/Character'
import { getCharacters } from './services/characters.service'
import logo from './assets/logo.png'

const FAVORITES_KEY = 'favorites'

export const App: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const favorites = useRef<Character[]>([])

  useEffect(() => {
    /* If there are saved favorites characters load them */
    const rawFavorites = localStorage.getItem(FAVORITES_KEY)
    if (rawFavorites) {
      const savedFavorites = JSON.parse(rawFavorites) as Character[]
      favorites.current = savedFavorites
    }

    ;(async function () {
      /* Fetch characters from API */
      const charactersDto = await getCharacters()

      /* Map characters from API to characters with [isFavorite] property */
      const characters = charactersDto.map((currentCharacterDto) => {
        const { id, name, image } = currentCharacterDto
        /*
          If the fetched characters are in [favorites]
          then initializate them with [isFavorite = true]
        */
        const isFavorite = favorites.current.find((currentFavorite) => {
          return currentFavorite.id === currentCharacterDto.id
        })
        return new Character(id, name, image, Boolean(isFavorite))
      })
      setCharacters(characters)
    })()
  }, [])

  const onClick = (characterToModify: Character) => {
    /* Update characters */
    const updatedCharacters = characters.map((currentCharacter) => {
      /* Modify character if its favorite button was clicked */
      if (currentCharacter.id === characterToModify.id) {
        const { id, name, image, isFavorite } = characterToModify
        const updatedCharacter = new Character(id, name, image, !isFavorite)
        /*
          Favorite button was clicked, right?
          Then if the character is favorite then remove it from [favorites]
          else add it.
          This is toggling!
        */
        if (isFavorite) {
          favorites.current = favorites.current.filter((currentFavorite) => {
            return currentFavorite.id !== updatedCharacter.id
          })
        } else {
          favorites.current.push(updatedCharacter)
        }
        return updatedCharacter
      }

      /* Do not modify character that was not clicked */
      return currentCharacter
    })
    /* Save favorite characters to local storage */
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.current))
    /* Update characters state */
    setCharacters(updatedCharacters)
  }

  return (
    <div className='max-w-5xl m-auto p-4'>
      <div className='max-w-sm m-auto mb-8'>
        <img src={logo} alt='Logo' />
      </div>
      <ul className='card-container'>
        {characters.map((character) => {
          return (
            <Card
              key={character.id}
              character={character}
              onClick={() => onClick(character)}
            />
          )
        })}
      </ul>
    </div>
  )
}
