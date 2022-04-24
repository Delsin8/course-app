import React from 'react'
import style from './section.module.scss'
import { course2, Course } from '../../../types'
import { BiBook } from 'react-icons/bi'
import { AiOutlineClockCircle, AiFillStar } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'

export const countHours = (d: number) => {
  const hours = Math.round(d / 60)
  const minutes = Math.round(d % 60)

  const duration = `${hours + 'h'} ${minutes > 0 ? minutes + 'm' : ''}`
  return duration
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <div>
          <div className={style.stat}>
            <BiBook />
            {lessons} lessons
          </div>
          <div className={style.stat}>
            <AiOutlineClockCircle />
            {countHours(duration)}
          </div>
        </div>
        <div>
          <div className={style.stat} style={{ justifyContent: 'end' }}>
            {rating === null ? 'not rated' : `${rating.toFixed(1)}(${votes})`}
            <AiFillStar />
          </div>
          <div className={style.stat}>
            <span style={{ paddingRight: '1px' }}>{students} students</span>
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
