import Section from '../../components/course/Section'
import style from './course.module.scss'
import Layout from '../../layouts/Layout/Layout'
import Author from '../../components/author/Author'
import Review from '../../components/review/Review'
import { useEffect, useState } from 'react'
import { course, course2, section } from '../../types'
import Title from '../../components/typography/Title'
import BuyingWindow from '../../components/course/BuyingWindow'
import SkeletonCoursePage from './Skeleton/SkeletonCoursePage'
import { OutlinedButton } from '../../components/button/Button'
import Modal from '../../components/modal/Modal'
import ReviewBody, { ratingType } from './Modal/ReviewBody'
import { client } from '../../api/client'

interface course3 extends course {
  sections: section[]
}

const Course = () => {
  const [data, setData] = useState<course3>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sectionID = window.location.pathname.split('/').pop()
    const url = `http://localhost:5000/api/courses/${sectionID}`
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

  const sendReview = async (text: string, rating: ratingType) => {
    const url = 'http://localhost:5000/api/reviews'
    const token = localStorage.getItem('token')

    await client.post(
      url,
      JSON.stringify({ body: text, rating, course: data?._id }),
      { headers: { 'x-api-key': token } }
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
            <Section key={d._id} {...d} />
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
        <Title>Authors: {data?.authors.length}</Title>
        <div className={style.authorSection}>
          {data?.authors.map(a => (
            <Author key={a._id} {...a} />
          ))}
        </div>
      </div>
      {/* comments */}
      <Title centered>Comments</Title>
      <div className={style.commentSection}>
        {data?.reviews.map(c => (
          <Review key={c._id} {...c} />
        ))}
        <Modal title="Some title" body={<ReviewBody dispatch={sendReview} />}>
          Write a review
        </Modal>
      </div>
      {/* buying window */}
      <BuyingWindow courseID={data?._id!} />
    </Layout>
  )
}

export default Course
