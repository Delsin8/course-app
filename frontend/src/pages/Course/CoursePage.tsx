import Section from '../../components/course/Section'
import { OutlinedButton, ContainedButton } from '../../components/button/Button'
import style from './course.module.scss'
import Layout from '../../layouts/Layout/Layout'
import Author from '../../components/author/Author'
import Comment from '../../components/comment/Comment'
import { BiBook } from 'react-icons/bi'
import { AiFillStar, AiOutlineClockCircle } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { countHours } from '../../components/course/Course'

export interface d {
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  lessons: number
  duration: number
}

const data: d[] = [
  {
    title: 'first',
    difficulty: 'Beginner',
    lessons: 10,
    duration: 12,
  },
  {
    title: 'second',
    difficulty: 'Advanced',
    lessons: 15,
    duration: 4,
  },
  {
    title: 'third',
    difficulty: 'Intermediate',
    lessons: 23,
    duration: 26,
  },
]

const Course = () => {
  return (
    <Layout>
      {/* description */}
      <div className={style.descriptionWrapper}>Description</div>
      {/* course content */}
      <div className={style.sections}>
        {data.map(d => (
          <Section key={d.title} {...d} />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '6px 0' }}>
        Show full course content
      </div>
      {/* authors */}
      <div>
        <div>Authors: 3</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
          }}
        >
          {[0, 1, 2].map(a => (
            <Author key={a} />
          ))}
        </div>
      </div>
      {/* comments */}
      <div>Comments</div>
      {[0, 1, 2].map(c => (
        <Comment key={c} />
      ))}
      {/* buying window */}
      <div className={style.purchaseSection}>
        <div style={{ alignSelf: 'center', fontSize: '2rem' }}>18.99$</div>

        <div>
          <ContainedButton backgroundColor="#486876" color="white">
            Buy now
          </ContainedButton>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div className={style.stat}>
              <BiBook />
              21 lessons
            </div>
            <div className={style.stat}>
              <AiOutlineClockCircle />
              {countHours(456)}h
            </div>
          </div>
          <div>
            <div className={style.stat} style={{ justifyContent: 'end' }}>
              4.5 (154)
              <AiFillStar />
            </div>
            <div className={style.stat}>
              10 students
              <BsFillPeopleFill />
            </div>
          </div>
        </div>

        <div className={style.test}>
          <div className={style.box}></div>
        </div>
      </div>
    </Layout>
  )
}

export default Course
