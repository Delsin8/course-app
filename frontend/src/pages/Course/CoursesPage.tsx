import style from './course.module.scss'
import { Course as ICourse } from '../../../types'
import Course from '../../components/course/Course'
import Layout from '../../layouts/Layout/Layout'
import FilterItem from '../../components/filter/FilterItem'
import Filter from '../../components/filter/Filter'
import { useEffect, useState } from 'react'

interface ICourse2 extends ICourse {
  avg_rating: number
  votes: number
  lessons: number
  duration: number
}

export interface IFilter {
  type: 'price_from' | 'price_to' | 'rating' | 'duration'
  value: any
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<ICourse2[]>([])
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
  const [filters, setFilters] = useState<IFilter[]>([])

  const handleSetFilters = (
    newFilter: IFilter,
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

  const getFilteredCourses = () => {
    let filtered = [...courses]

    // price from
    const price_from = filters.find(f => f.type === 'price_from')
    if (price_from)
      filtered = filtered.filter(
        c => c.price >= filters.find(f => f.type === 'price_from')?.value
      )
    // price to
    const price_to = filters.find(f => f.type === 'price_to')
    if (price_to)
      filtered = filtered.filter(
        c => c.price <= filters.find(f => f.type === 'price_to')?.value
      )
    // rating
    const rating = filters.find(f => f.type === 'rating')
    if (rating)
      filtered = filtered.filter(
        c => c.avg_rating >= filters.find(f => f.type === 'rating')?.value
      )

    // duration
    const durationArr: string[] = []
    filters.map(f => f.type === 'duration' && durationArr.push(f.value))
    if (durationArr.length > 0) {
      filtered = filtered.filter(
        c =>
          (durationArr.find(d => d === 'short') && c.duration < 6 * 60) ||
          (durationArr.find(d => d === 'medium')
            ? c.duration > 6 * 60 && c.duration < 12 * 60
            : false) ||
          (durationArr.find(d => d === 'long') && c.duration > 12 * 60)
      )
    }

    return filtered
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
        amount: courses.filter(c => c.duration < 6).length,
      },
      {
        name: 'duration_medium',
        amount: courses.filter(c => c.duration > 6 && c.duration < 12).length,
      },
      {
        name: 'duration_long',
        amount: courses.filter(c => c.duration > 6).length,
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
        {/* courses */}
        {/* filter items */}
        <div>
          <div className={style.filterItems}>
            {filters.map(f => (
              <FilterItem key={Math.random()} {...f} />
            ))}
          </div>
          <div className={style.courses}>
            {getFilteredCourses().map(course => (
              <Course
                key={course._id}
                {...course}
                lessons={course.lessons}
                duration={course.duration}
                rating={course.avg_rating}
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
