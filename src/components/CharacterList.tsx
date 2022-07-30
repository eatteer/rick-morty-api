import { Character } from '../services/types'
import Card from './Card'

type Props = {
  characters: Character[]
  onClick: Function
}

const CharacterList = ({ characters, onClick }: Props) => {
  return (
    <ul className='character-list'>
      {characters.map((character) => {
        return (
          <Card
            key={character.id}
            name={character.name}
            isFavorite={character.isFavorite}
            image={character.image}
            onClick={() => onClick(character)}
          />
        )
      })}
    </ul>
  )
}

export default CharacterList
