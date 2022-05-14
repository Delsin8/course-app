import { useEffect, useState } from 'react'
import { client } from '../../api/client'
import style from './home.module.scss'
import Course from '../../components/course/Course'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import { course, course2 } from '../../types'
import _ from 'lodash'
import Search from '../../feature/search/Search'
import SkeletonHomePage from './Skeleton/SkeletonHomePage'

const HomePage = () => {
  const [courses, setCourses] = useState<course2[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const url = 'http://localhost:5000/api/courses?full=1'
    const fetchCourses = async () => {
      const response = await client.get(url)
      if (response.status < 204) {
        setCourses(response.data)
        setIsLoading(false)
      } else console.log('Something went wrong')
    }

    fetchCourses()
  }, [])
  const getNewestCourses = (courses: course2[]) => {
    const sortedCourses = _.orderBy(
      courses,
      ({ created_at }) => new Date(created_at),
      'desc'
    )
    const newestCourses = sortedCourses.slice(0, 5)

    return newestCourses
  }
  const getHighestRatedCourses = (courses: course2[]) => {
    const sortedCourses = _.orderBy(
      courses,
      ({ avg_rating }) => avg_rating || '',
      'desc'
    )
    const highestRatedCourses = sortedCourses.slice(0, 5)

    return highestRatedCourses
  }
  const getMostPopularCourses = (courses: course2[]) => {
    const sortedCourses = _.orderBy(
      courses,
      ({ students }) => students || '',
      'desc'
    )
    const highestRatedCourses = sortedCourses.slice(0, 5)

    return highestRatedCourses
  }

  if (isLoading) return <SkeletonHomePage />

  return (
    <Layout>
      {/* hero section */}
      <div onClick={() => console.log(courses)} className={style.heroSection}>
        <div className={style.heroSectionContent}>
          <img src="/images/hero_section_1.png" />
        </div>
        <Title centered big noMarginTop noMarginBottom>
          Find your courses
        </Title>
        <Search heroSection />
      </div>
      {/* some stuff */}
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
