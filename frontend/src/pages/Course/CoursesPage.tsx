import style from './course.module.scss'
import { Course as ICourse } from '../../../types'
import Course from '../../components/course/Course'
import Layout from '../../layouts/Layout/Layout'
import FilterItem from '../../components/filter/FilterItem'
import Filter from '../../components/filter/Filter'
import { useEffect, useState } from 'react'

const filterItems: string[] = ['price: <14.99$', 'rating: 4+', 'duration: 8h+']

const CoursesPage = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  useEffect(() => {
    const url = 'http://localhost:5000/api/courses'
    const options: RequestInit = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const fetchCourses = async () => {
      const response = await fetch(url, options)
      if (response.ok) setCourses(await response.json())
      else console.log('Something went wrong')
    }

    fetchCourses()
  }, [])

  return (
    <Layout>
      {/* <div className={style.wrapper}> */}
      {/* filter items */}
      <div className={style.filterItems}>
        {filterItems.map(f => (
          <FilterItem key={f}>{f}</FilterItem>
        ))}
      </div>
      {/* filter */}
      <div className={style.mainSection}>
        <Filter />
        {/* courses */}
        <div className={style.courses}>
          {courses.map(d => (
            <Course
              key={d.price}
              {...d}
              lessons={14}
              duration={156}
              rating={4.5}
              students={566}
              votes={103}
            />
          ))}
        </div>
      </div>
      {/* </div> */}
    </Layout>
  )
}

export default CoursesPage
