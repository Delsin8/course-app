import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { like, dislike } from '../../services/s'
import Section from '../../components/course/Section'
import { OutlinedButton, ContainedButton } from '../../components/button/Button'
import style from './course.module.scss'

export interface d {
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  lessons: Number
}

const data: d[] = [
  {
    title: 'first',
    difficulty: 'Beginner',
    lessons: 10,
  },
  {
    title: 'second',
    difficulty: 'Advanced',
    lessons: 15,
  },
  {
    title: 'third',
    difficulty: 'Intermediate',
    lessons: 23,
  },
]

const Course = () => {
  const s = useSelector((state: RootState) => state.counter)
  const u = useSelector((state: RootState) => state.user)
  console.log(s)
  console.log(u)

  const dispatch = useDispatch()

  const likeAction = () => {
    dispatch(like())
  }

  return (
    <>
      {data.map(({ title, difficulty, lessons }) => (
        <Section
          key={title}
          title={title}
          difficulty={difficulty}
          lessons={lessons}
        />
      ))}

      <div className={style.purchaseSection}>
        <div style={{ alignSelf: 'center', fontSize: '2rem' }}>18.99$</div>

        <div>
          <OutlinedButton color="#9A43B9" outlineColor="#9A43B9">
            Add to cart
          </OutlinedButton>
          <ContainedButton backgroundColor="#486876" color="white">
            Buy now
          </ContainedButton>
        </div>

        <div className={style.test}>
          <div className={style.box}></div>
        </div>
      </div>
    </>
  )
}

export default Course
