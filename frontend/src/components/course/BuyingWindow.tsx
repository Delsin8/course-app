import React, { useContext, useEffect, useState } from 'react'
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
import { Link } from 'react-router-dom'

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
  const [purchased, setPurchased] = useState<course>()
  const [isLoading, setIsLoading] = useState(true)

  const { _id, avg_rating, lessons, price, votes, students, duration } = course

  useEffect(() => {
    const checkPurchase = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const token = localStorage.getItem('token')
        const url = `http://localhost:5000/api/purchased-courses/check/${_id}`
        const res = await client.get(url, { headers: { 'x-api-key': token } })

        setIsLoading(false)
        if (res.status < 204) {
          setPurchased(res.data.course)
          return
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    checkPurchase()
  }, [isLoading])

  const getLessonID = (course: course) => {
    const lesson = course.sections.find(c => {
      return c.lessons.find(l => l)
    })
    if (lesson) return lesson.lessons[0]._id
    return ''
  }

  const purchaseCourse = async () => {
    if (!user) {
      notifyFailure('You need to be logged in')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const res = await client.post(
        'http://localhost:5000/api/purchased-courses',
        JSON.stringify({
          course: _id,
        }),
        { headers: { 'x-api-key': token } }
      )

      if (res.status < 204) {
        setIsLoading(true)
        notifySuccess('The course has been added to your library')
      }
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

  if (isLoading) return <span></span>

  return (
    <div className={style.purchaseSection}>
      {purchased ? (
        <Link to={`/lessons/${getLessonID(purchased)}`}>
          <button className={`${style.btn} ${style.buy}`}>
            Go to the course
          </button>
        </Link>
      ) : (
        <button
          className={`${style.btn} ${style.buy}`}
          onClick={purchaseCourse}
        >
          Buy now
        </button>
      )}
      <button className={`${style.btn} ${style.add}`} onClick={addToWishlist}>
        Add to wishlist
      </button>
    </div>
  )
}

export default BuyingWindow
