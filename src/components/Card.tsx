import { FC, MouseEventHandler } from 'react'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'
import { Character } from '../entities/Character'

type Props = {
  character: Character
  onClick: MouseEventHandler
}

export const Card: FC<Props> = ({ character, onClick }) => {
  return (
    <li className='bg-white rounded-bl-lg rounded-br-lg drop-shadow-md'>
      <img
        className='rounded-tl-lg rounded-tr-lg'
        src={character.image}
        alt={character.name}
      />
      <div className='p-4'>
        <h2 className='mb-2 font-bold line-clamp-1 '>{character.name}</h2>
        {character.isFavorite ? (
          <button
            className='button-circle light border-pink-700'
            onClick={onClick}
          >
            <span>
              <MdOutlineFavorite fill='rgb(190 24 93)' />
            </span>
          </button>
        ) : (
          <button className='button-circle light' onClick={onClick}>
            <span>
              <MdOutlineFavoriteBorder />
            </span>
          </button>
        )}
      </div>
    </li>
  )
}
