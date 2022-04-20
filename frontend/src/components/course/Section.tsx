import React from 'react'
import style from './section.module.scss'
import { d } from '../../pages/Course/CoursePage'

const Section: React.FC<d> = ({ title, difficulty, lessons, duration }) => {
  return (
    <div className={style.container}>
      <div className={style.circle}>
        <div className={style.duration}>{duration}h</div>
      </div>

      <div className={style.textContainer}>
        <div className={style.sectionTitle}>{title}</div>
        <div className={style.smallFontSize} style={{ color: 'grey' }}>
          {lessons} lessons
        </div>
        <div
          className={`${style.smallFontSize} ${style.fontItalic}`}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          {difficulty} <div className={style.difficultyIndicator}></div>
        </div>
      </div>
    </div>
  )
}

export default Section
