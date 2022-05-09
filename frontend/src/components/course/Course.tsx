import React from 'react'
import style from './course.module.scss'
import { course2, course } from '../../types'
import { BiBook } from 'react-icons/bi'
import { AiOutlineClockCircle, AiFillStar } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const countHours = (d: number) => {
  const hours = Math.round(d / 60)
  const minutes = Math.round(d % 60)

  const duration = `${hours + 'h'} ${minutes > 0 ? minutes + 'm' : ''}`
  return duration
}

const Course: React.FC<course2> = ({
  _id,
  authors,
  description,
  duration,
  lessons,
  price,
  avg_rating,
  students,
  title,
  votes,
}) => {
  return (
    <Link to={`/courses/${_id}`} className={style.wrapper} title={title}>
      {/* img */}
      <div className={style.imageWrapper}>
        <img src="/images/PEPE.png" />
      </div>
      {/* title */}
      <h4
        style={{
          padding: '0 4px',
          textAlign: 'center',
          margin: '4px 0',
          width: '98%',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </h4>
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
            {avg_rating === null
              ? 'not rated'
              : `${avg_rating.toFixed(1)}(${votes})`}
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
    </Link>
  )
}

export default Course
