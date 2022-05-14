import React, { useContext } from 'react'
import { AiFillHeart, AiFillStar, AiOutlineClockCircle } from 'react-icons/ai'
import { BiBook } from 'react-icons/bi'
import { BsFillPeopleFill } from 'react-icons/bs'
import { client } from '../../api/client'
import CountTime from '../../utils/countTime'
import { OutlinedButton } from '../button/Button'
import style from './course.module.scss'

import {
  notifyFailure as failure,
  notifySuccess as success,
} from '../../components/notification/Notification'
import { UserContext } from '../../UserContext'
import { course, course2 } from '../../types'

interface buyingWindow {
  course: course
  notifySuccess: typeof success
  notifyFailure: typeof failure
}

const BuyingWindow: React.FC<buyingWindow> = ({
  course,
  notifyFailure,
  notifySuccess,
}) => {
  const { user } = useContext(UserContext)
  const { _id, avg_rating, lessons, price, votes, students, duration } = course
  console.log(course)
  const purchaseCourse = () => {
    if (!user) {
      notifyFailure('You need to be logged in')
      return
    }

    try {
      const token = localStorage.getItem('token')
      client.post(
        'http://localhost:5000/api/purchased-courses',
        JSON.stringify({
          course: _id,
        }),
        { headers: { 'x-api-key': token } }
      )
      notifySuccess('The course has been added to your library')
    } catch (error) {
      notifyFailure('Something went wrong')
    }
  }

  const addToWishlist = () => {
    if (!user) {
      notifyFailure('You need to be logged in')
      return
    }

    try {
      const token = localStorage.getItem('token')
      client.put(
        'http://localhost:5000/api/wishlists',
        JSON.stringify({
          course: _id,
        }),
        { headers: { 'x-api-key': token } }
      )
      notifySuccess('The course has been added to your wishlist')
    } catch (error) {
      notifyFailure('Something went wrong')
    }
  }

  return (
    <div className={style.purchaseSection}>
      <div className={style.buyingWindowPrice}>{price}$</div>

      <div className={style.buyButtonWrapper} onClick={purchaseCourse}>
        <OutlinedButton outlineColor="#9A43B9" color="#9A43B9" glowing>
          Buy now
        </OutlinedButton>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <div className={style.stat}>
            <BiBook />
            {lessons}{' '}
            <span className={style.buyingWindowAdditional}>lessons</span>
          </div>
          <div className={style.stat}>
            <AiOutlineClockCircle />
            {CountTime(duration)}
          </div>
        </div>
        <div>
          <div className={style.stat}>
            <AiFillStar />
            {avg_rating === null
              ? 'not rated'
              : `${avg_rating.toFixed(1)}(${votes})`}
          </div>
          <div className={style.stat}>
            <BsFillPeopleFill />
            {students}{' '}
            <span className={style.buyingWindowAdditional}>students</span>
          </div>
        </div>
      </div>

      <div className={style.wishlistButtonWrapper} onClick={addToWishlist}>
        <AiFillHeart style={{ fontSize: '32px' }} />
      </div>
    </div>
  )
}

export default BuyingWindow
