import style from './courseContent.module.scss'
import React from 'react'

const SkeletonCourseContent: React.FC<{ inactive?: boolean }> = ({
  inactive,
}) => {
  return (
    <div
      className={`${style.skeleton} ${inactive ? style.inactive : ''}`}
    ></div>
  )
}

export default SkeletonCourseContent
