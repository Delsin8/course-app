import React from 'react'
import style from './course.module.scss'
import CountTime from '../../utils/countTime'
import { section } from '../../types'

const Section: React.FC<section> = ({
  title,
  difficulty,
  lessonsAmount,
  duration,
}) => {
  return (
    <div className={style.container}>
      <div className={style.circle}>
        <div className={style.duration}>{CountTime(duration)}</div>
      </div>

      <div className={style.textContainer}>
        <div className={style.sectionTitle}>{title}</div>
        <div className={style.smallFontSize} style={{ color: 'grey' }}>
          {lessonsAmount} lessons
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
