import { useEffect, useState } from 'react'
import { client } from '../../api/client'
import style from './home.module.scss'
import Course from '../../components/course/Course'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import { course } from '../../types'
import _ from 'lodash'
import Search from '../../features/search/Search'
import SkeletonHomePage from './SkeletonHome/SkeletonHomePage'
import {
  getHighestRatedCourses,
  getMostPopularCourses,
  getNewestCourses,
} from '../../functions/sort'

const HomePage = () => {
  const [courses, setCourses] = useState<course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = '/api/courses?full=1'
        const response = await client.get(url)

        setCourses(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCourses()
  }, [])

  if (isLoading) return <SkeletonHomePage />

  return (
    <Layout>
      <div className={style.heroSection}>
        <div className={style.heroSectionContent}>
          <img src="/images/hero_section_1.png" />
        </div>
        <Title centered big noMarginTop noMarginBottom>
          Find your courses
        </Title>
        <Search heroSection />
      </div>

      <Title>Newest courses</Title>
      <div className={style.courses}>
        {getNewestCourses(courses).map(c => (
          <Course key={`newest_${c._id}`} {...c} />
        ))}
      </div>
      <Title>Highest rated courses</Title>
      <div className={style.courses}>
        {getHighestRatedCourses(courses).map(c => (
          <Course key={`highest_rated_${c._id}`} {...c} />
        ))}
      </div>
      <Title>Post popular courses</Title>
      <div className={style.courses}>
        {getMostPopularCourses(courses).map(c => (
          <Course key={`popular_${c._id}`} {...c} />
        ))}
      </div>
    </Layout>
  )
}

export default HomePage
