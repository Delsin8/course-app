import style from './course.module.scss'
import { Course as ICourse, course2, filter } from '../../../types'
import Course from '../../components/course/Course'
import Layout from '../../layouts/Layout/Layout'
import FilterItem from '../../components/filter/FilterItem'
import Filter from '../../components/filter/Filter'
import { useEffect, useState } from 'react'
import { getFilteredCourses } from '../../functions/filter'

interface ICourse2 extends ICourse {
  avg_rating: number
  votes: number
  lessons: number
  duration: number
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<course2[]>([])
  useEffect(() => {
    const url = 'http://localhost:5000/api/courses?full=1'
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

  // filters
  const [filters, setFilters] = useState<filter[]>([])

  const handleSetFilters = (
    newFilter: filter,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (newFilter.type !== 'duration') {
      const filtered = filters.filter(f => f.type !== newFilter.type)
      setFilters([...filtered, newFilter])
      return
    }

    const exists = filters.find(
      f => f.type === 'duration' && f.value === newFilter.value
    )
    if (exists) {
      // && !e?.target.checked
      const index = filters.indexOf(exists)
      const [removedFilter] = filters.splice(index, 1)
      setFilters(filters.filter(f => f != removedFilter))
      return
    }
    setFilters([...filters, newFilter])
  }

  const coursesAmount = () => {
    const items: { name: string; amount: any }[] = [
      {
        name: 'rating_all',
        amount: courses.length,
      },
      {
        name: 'rating_3',
        amount: courses.filter(c => c.avg_rating >= 3).length,
      },
      {
        name: 'rating_35',
        amount: courses.filter(c => c.avg_rating >= 3.5).length,
      },
      {
        name: 'rating_4',
        amount: courses.filter(c => c.avg_rating >= 4).length,
      },
      {
        name: 'rating_45',
        amount: courses.filter(c => c.avg_rating >= 4.5).length,
      },
      // duration
      {
        name: 'duration_short',
        amount: courses.filter(c => c.duration < 6 * 60).length,
      },
      {
        name: 'duration_medium',
        amount: courses.filter(c => c.duration > 6 * 60 && c.duration < 12 * 60)
          .length,
      },
      {
        name: 'duration_long',
        amount: courses.filter(c => c.duration > 12 * 60).length,
      },
    ]

    return items
  }

  return (
    <Layout>
      <button onClick={() => console.log(filters)}>Click</button>
      {/* <div className={style.wrapper}> */}
      {/* filter */}
      <div className={style.mainSection}>
        <Filter setFilters={handleSetFilters} courseAmount={coursesAmount()} />
        {/* filter items */}
        <div>
          <div className={style.filterItems}>
            {filters.map(f => (
              <FilterItem key={Math.random()} {...f} />
            ))}
          </div>
          <div className={style.courses}>
            {getFilteredCourses(courses, filters).map(course => (
              <Course
                key={course._id}
                {...course}
                lessons={course.lessons}
                duration={course.duration}
                avg_rating={course.avg_rating}
                students={566}
                votes={course.votes}
              />
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  )
}

export default CoursesPage
