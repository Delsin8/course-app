import Section from '../../components/course/Section'
import style from './course.module.scss'
import Layout from '../../layouts/Layout/Layout'
import Author from '../../components/author/Author'
import Comment from '../../components/comment/Comment'
import { useEffect, useState } from 'react'
import { Course, course2, section } from '../../../types'
import Title from '../../components/typography/Title'
import BuyingWindow from '../../components/course/BuyingWindow'
import SkeletonCoursePage from './Skeleton/SkeletonCoursePage'

export interface d {
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  lessons: number
  duration: number
}

interface course3 extends Course {
  sections: section[]
}

const Course = () => {
  const [data, setData] = useState<course3>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url = `http://localhost:5000/api/courses/61ebd93d5b288295c5227a2d`
    const options: RequestInit = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const fetchCourse = async () => {
      const response = await fetch(url, options)
      if (response.ok) {
        setData(await response.json())
        setIsLoading(false)
      } else console.log('Something went wrong')
    }

    fetchCourse()
  }, [])

  if (isLoading) return <SkeletonCoursePage />

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
        <div className={style.authorSection}>
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
      <BuyingWindow courseID={data?._id!} />
    </Layout>
  )
}

export default Course
