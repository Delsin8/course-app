import React from 'react'
import style from './section.module.scss'
import { d } from '../../pages/Course/CoursePage'

const Section: React.FC<d> = ({ title, difficulty, lessons }) => {
  return (
    <div className={style.container}>
      <div className={style.verticalLine}>
        <div className={style.difficultyLevel}>{difficulty}</div>
        <div className={style.lessonsAmount}>{lessons} lessons</div>
      </div>

      <div className={style.textContainer}>
        <div className={style.sectionTitle}>{title}</div>
      </div>
    </div>
  )
}

export default Section
