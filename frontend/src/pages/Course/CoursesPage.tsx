import style from './course.module.scss'
import { course, filter } from '../../types'
import Course from '../../components/course/Course'
import Layout from '../../layouts/Layout/Layout'
import FilterItem from '../../features/filter/FilterItem'
import Filter from '../../features/filter/Filter'
import { useEffect, useState } from 'react'
import { getCoursesAmount, getFilteredCourses } from '../../functions/filter'
import _ from 'lodash'
import { order, Sort, sortBy } from '../../components/sortingWindow/sort.types'
import SortingWindow from '../../components/sortingWindow/SortingWindow'
import Pagination from './Pagination'
import SkeletonCoursesPage from './SkeletonCoursePages/SkeletonCoursesPage'
import { useSearchParams } from 'react-router-dom'

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const search = searchParams.get('search')
    const url = `http://localhost:5000/api/courses?full=1${
      search ? `&search=${search}` : ''
    }
    `
    const options: RequestInit = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const fetchCourses = async () => {
      const response = await fetch(url, options)
      if (response.ok) {
        setCourses(await response.json())
        setIsLoading(false)
      } else console.log('Something went wrong')
    }

    fetchCourses()
  }, [searchParams])

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

  const removeFilter = (filterToRemove: filter) => {
    const filtered = filters.filter(f => f != filterToRemove)

    setFilters(filtered)
  }

  // sorting
  const [showSortingWindow, setShowSortingWindow] = useState(false)

  const defaultSort: Sort = { sortBy: 'students', order: 'desc' }
  const [sort, setSort] = useState<Sort>(defaultSort)

  const getPreparedCourses = (
    courses: course[],
    filters: filter[],
    sort: Sort
  ) => {
    const filtered = getFilteredCourses(courses, filters)
    const sorted = _.orderBy(filtered, sort.sortBy, sort.order)

    return sorted
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 12
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage

  // get final version of courses
  const getCourses = (courses: course[], filters: filter[], sort: Sort) => {
    const finalCourses = getPreparedCourses(courses, filters, sort)
    return finalCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  }

  if (isLoading) return <SkeletonCoursesPage />
  return (
    <Layout big>
      {/* filter */}
      <div className={style.mainSection}>
        <Filter
          filters={filters}
          setFilters={handleSetFilters}
          courseAmount={getCoursesAmount(courses)}
        />
        {/* filter items */}
        <div>
          <div className={style.filterItems}>
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
            {filters.map(f => (
              <FilterItem
                key={Math.random()}
                filter={f}
                removeFilter={removeFilter}
              />
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
                students={course.students || 0}
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
