import Section from '../../components/course/Section'
import { OutlinedButton, ContainedButton } from '../../components/button/Button'
import style from './course.module.scss'
import Layout from '../../layouts/Layout/Layout'
import Author from '../../components/author/Author'
import Comment from '../../components/comment/Comment'
import { BiBook } from 'react-icons/bi'
import { AiFillStar, AiOutlineClockCircle, AiFillHeart } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { countHours } from '../../components/course/Course'
import { useEffect, useState } from 'react'
import { Course, course2 } from '../../../types'
import Title from '../../components/typography/Title'
import { client } from '../../api/client'

export interface d {
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  lessons: number
  duration: number
}

export interface ISection {
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'All levels'
  lessonsAmount: number
  duration: number
}

interface course3 extends Course {
  sections: ISection[]
}

const Course = () => {
  const [data, setData] = useState<course3>()

  useEffect(() => {
    const url = `http://localhost:5000/api/courses/61ebd93d5b288295c5227a2d`
    const options: RequestInit = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const fetchCourse = async () => {
      const response = await fetch(url, options)
      if (response.ok) setData(await response.json())
      else console.log('Something went wrong')
    }

    fetchCourse()
  }, [])

  const purchaseCourse = () => {
    client.post(
      'http://localhost:5000/api/purchased-courses',
      JSON.stringify({
        user: '61e6e49cc9e2a8deeea84c1e',
        course: data?._id,
      })
    )
  }

  return (
    <Layout>
      {/* info */}
      <div className={style.infoSection}>
        <Title centered noMarginBottom>
          {data?.title}
        </Title>
        <div className={style.description}>{data?.description}</div>
      </div>
      {/* course content */}
      <div className={style.sectionsWrapper}>
        <div style={{ paddingBottom: '.4rem', fontWeight: '500' }}>
          This course consists of these sections:
        </div>
        <div className={style.sections}>
          {data?.sections.map(d => (
            <Section key={d.title} {...d} />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            textDecoration: 'underline',
            fontSize: '.8rem',
          }}
        >
          Show full course content
        </div>
      </div>
      {/* authors */}
      <div>
        <Title>Authors: 3</Title>
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
      <Title centered>Comments</Title>
      <div className={style.commentSection}>
        {[0, 1, 2].map(c => (
          <Comment key={c} />
        ))}
      </div>
      {/* buying window */}
      <div className={style.purchaseSection}>
        <div style={{ alignSelf: 'center', fontSize: '2rem' }}>18.99$</div>

        <div onClick={purchaseCourse}>
          <OutlinedButton outlineColor="#9A43B9" color="#9A43B9" glowing big>
            Buy now
          </OutlinedButton>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div>
            <div className={style.stat}>
              <BiBook />
              21 lessons
            </div>
            <div className={style.stat}>
              <AiOutlineClockCircle />
              {countHours(456)}
            </div>
          </div>
          <div>
            <div className={style.stat}>
              <AiFillStar />
              4.5 (154)
            </div>
            <div className={style.stat}>
              <BsFillPeopleFill />
              10 students
            </div>
          </div>
        </div>

        <div className={style.wishlistButtonWrapper}>
          <AiFillHeart style={{ fontSize: '32px' }} />
        </div>
      </div>
    </Layout>
  )
}

export default Course
