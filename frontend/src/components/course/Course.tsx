import React from 'react'
import style from './course.module.scss'
import { course } from '../../types'
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

interface ICourse extends course {
  type?: 'default' | 'list'
}

const Course: React.FC<ICourse> = ({
  _id,
  description,
  duration,
  lessons,
  price,
  avg_rating,
  students,
  title,
  votes,
  thumbnail,
  type = 'default',
}) => {
  switch (type) {
    case 'list':
      return (
        <div className={style.listWrapper}>
          <div className={style.listImageWrapper}>
            <img
              src={`/images/${thumbnail || 'course_default.jpg'}`}
              className={style.image}
            />
          </div>
          <div>
            <div className={style.listTitle}>{title}</div>
            <div className={style.listDescription}>{description}</div>
          </div>
        </div>
      )

    default:
      return (
        <Link to={`/courses/${_id}`} className={style.wrapper} title={title}>
          {/* img */}
          <div className={style.imageWrapper}>
            <img
              className={style.image}
              src={`/images/${thumbnail || 'course_default.jpg'}`}
            />
          </div>
          {/* title */}
          <h4 className={style.courseTitle}>{title}</h4>
          {/* stats */}
          <div className={style.statsWrapper}>
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
              <div className={style.stat} style={{ justifyContent: 'end' }}>
                <span style={{ paddingRight: '1px' }}>
                  {students || 0} students
                </span>
                <BsFillPeopleFill />
              </div>
            </div>
          </div>
          {/* price */}
          <h2 className={style.price}>{price}$</h2>
        </Link>
      )
  }
}

export default Course
