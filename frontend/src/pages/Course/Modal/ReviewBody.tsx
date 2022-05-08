import style from './reviewModal.module.scss'
import { useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { OutlinedButton } from '../../../components/button/Button'

export type ratingType = 1 | 2 | 3 | 4 | 5

interface reviewBody {
  dispatch: (t: string, r: ratingType) => void
}

const ReviewBody: React.FC<reviewBody> = ({ dispatch }) => {
  const [review, setReview] = useState('')
  const [rating, setRating] = useState<ratingType>(1)

  const ratingArr: ratingType[] = [1, 2, 3, 4, 5]

  const handleDispatch = () => {
    dispatch(review, rating)
  }

  return (
    <div>
      {/* review */}
      <textarea
        rows={4}
        placeholder="Start typing review..."
        onChange={e => setReview(e.target.value)}
        className={style.review}
      />
      {/* rating */}
      <div className={style.flex}>
        <span>Rating: </span>
        {ratingArr.map(s => (
          <div
            className={`${style.flex} ${style.star}`}
            key={`review_star_${s}`}
            onClick={() => setRating(s)}
          >
            {rating >= s ? <AiFillStar /> : <AiOutlineStar />}
          </div>
        ))}
      </div>
      {/* footer */}
      <div onClick={handleDispatch}>
        <OutlinedButton color="black" outlineColor="black">
          Send
        </OutlinedButton>
      </div>
    </div>
  )
}

export default ReviewBody
