import { MouseEventHandler } from 'react'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'

type Props = {
  name: string
  isFavorite: boolean
  image: string
  onClick: MouseEventHandler
}

const Card = ({ name, isFavorite, image, onClick }: Props) => {
  return (
    <li className='bg-white rounded-bl-lg rounded-br-lg drop-shadow-md'>
      <img className='rounded-tl-lg rounded-tr-lg' src={image} alt={name} />
      <div className='p-4'>
        <h2 className='mb-2 font-bold line-clamp-1 '>{name}</h2>
        {isFavorite ? (
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
export default Card
