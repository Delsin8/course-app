import React from 'react'
import style from './section.module.scss'
import { course2, Course } from '../../../types'
import { BiBook } from 'react-icons/bi'
import { AiOutlineClockCircle, AiFillStar } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'

export const countHours = (d: number) => {
  return Math.round(d / 60)
}

const Course: React.FC<course2 & Course> = ({
  authors,
  description,
  duration,
  lessons,
  price,
  rating,
  students,
  title,
  votes,
}) => {
  return (
    <div className={style.wrapper}>
      {/* img */}
      <div className={style.imageWrapper}>
        <img src="/images/3.jfif" />
      </div>
      {/* title */}
      <h3 style={{ textAlign: 'center', margin: '4px 0' }}>{title}</h3>
      {/* stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div className={style.stat}>
            <BiBook />
            {lessons} lessons
          </div>
          <div className={style.stat}>
            <AiOutlineClockCircle />
            {countHours(duration)}h
          </div>
        </div>
        <div>
          <div className={style.stat} style={{ justifyContent: 'end' }}>
            {rating} ({votes})
            <AiFillStar />
          </div>
          <div className={style.stat}>
            {students} students
            <BsFillPeopleFill />
          </div>
        </div>
      </div>
      {/* price */}
      <h2 className={style.price}>{price}$</h2>
    </div>
  )
}

export default Course
