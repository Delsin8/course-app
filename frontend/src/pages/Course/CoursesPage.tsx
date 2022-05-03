import style from './course.module.scss'
import { course, Course as ICourse, course2, filter } from '../../../types'
import Course from '../../components/course/Course'
import Layout from '../../layouts/Layout/Layout'
import FilterItem from '../../components/filter/FilterItem'
import Filter from '../../components/filter/Filter'
import { useEffect, useState } from 'react'
import { getCoursesAmount, getFilteredCourses } from '../../functions/filter'
import _ from 'lodash'
import { order, Sort, sortBy } from '../../components/sortingWindow/sort.types'
import SortingWindow from '../../components/sortingWindow/SortingWindow'
import Pagination from './Pagination'
import SkeletonCoursesPage from './Skeleton/SkeletonCoursesPage'

interface ICourse2 extends ICourse {
  avg_rating: number
  votes: number
  lessons: number
  duration: number
}

const CoursesPage: React.FC<{ search?: string }> = ({ search }) => {
  const [courses, setCourses] = useState<course2[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url = 'http://localhost:5000/api/courses?full=1'
    const options: RequestInit = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const fetchCourses = async () => {
      const response = await fetch(url, options)
      if (response.ok) {
        setCourses(await response.json())
        // const time = 1000
        // function delay(time: number) {
        //   return new Promise(resolve => setTimeout(resolve, time))
        // }

        // delay(time).then(() => setIsLoading(false))
        setIsLoading(false)
      } else console.log('Something went wrong')
    }

    fetchCourses()
  }, [])

  // filters
  const [filters, setFilters] = useState<filter[]>([])

  const handleSetFilters = (newFilter: filter) => {
    if (newFilter.type !== 'duration') {
      const filtered = filters.filter(f => f.type !== newFilter.type)
      setFilters([...filtered, newFilter])
      return
    }

    const exists = filters.find(
      f => f.type === 'duration' && f.value === newFilter.value
    )
    if (exists) {
      const index = filters.indexOf(exists)
      const [removedFilter] = filters.splice(index, 1)
      setFilters(filters.filter(f => f != removedFilter))
      return
    }
    setFilters([...filters, newFilter])
  }

  // sorting
  const [showSortingWindow, setShowSortingWindow] = useState(false)

  const defaultSort: Sort = { sortBy: 'students', order: 'desc' }
  const [sort, setSort] = useState<Sort>(defaultSort)

  const getPreparedCourses = (
    courses: course2[],
    filters: filter[],
    sort: Sort
  ) => {
    const filtered = getFilteredCourses(courses, filters)
    const sorted = _.orderBy(filtered, sort.sortBy, sort.order)

    // const paginated = sorted.slice(indexOfFirstCourse, indexOfLastCourse)

    return sorted
  }

  const handleSetSort = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      sortBy: { value: sortBy }
      order: { value: order }
    }

    const newSorting: Sort = {
      sortBy: target.sortBy.value,
      order: target.order.value,
    }

    setSort(newSorting)
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 5
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage

  // get final version of courses
  const getCourses = (courses: course2[], filters: filter[], sort: Sort) => {
    const finalCourses = getPreparedCourses(courses, filters, sort)
    return finalCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  }

  if (isLoading) return <SkeletonCoursesPage />
  return (
    <Layout big>
      <button onClick={() => setSort({ sortBy: 'price', order: 'asc' })}>
        price asc
      </button>
      {/* <div className={style.wrapper}> */}
      {/* filter */}
      <div className={style.mainSection}>
        <Filter
          setFilters={handleSetFilters}
          courseAmount={getCoursesAmount(courses)}
        />
        {/* filter items */}
        <div>
          <div className={style.filterItems}>
            {/*  */}
            <div
              onClick={() => setShowSortingWindow(!showSortingWindow)}
              className={style.sortButton}
            >
              Sort
            </div>
            {showSortingWindow && (
              <SortingWindow
                setSorting={setSort}
                showWindow={setShowSortingWindow}
              />
            )}
            {/*  */}
            {filters.map(f => (
              <FilterItem key={Math.random()} {...f} />
            ))}
          </div>
          <div className={style.courses}>
            {getCourses(courses, filters, sort).map(course => (
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
          <Pagination
            coursesAmount={getPreparedCourses(courses, filters, sort).length}
            coursesPerPage={coursesPerPage}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      </div>
      {/* </div> */}
    </Layout>
  )
}

export default CoursesPage
