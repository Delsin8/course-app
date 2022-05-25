import { course } from '../types'
import _ from 'lodash'

export const getNewestCourses = (courses: course[]) => {
  const sortedCourses = _.orderBy(
    courses,
    ({ created_at }) => new Date(created_at),
    'desc'
  )
  const newestCourses = sortedCourses.slice(0, 5)

  return newestCourses
}
export const getHighestRatedCourses = (courses: course[]) => {
  const sortedCourses = _.orderBy(
    courses,
    ({ avg_rating }) => avg_rating || '',
    'desc'
  )
  const highestRatedCourses = sortedCourses.slice(0, 5)

  return highestRatedCourses
}
export const getMostPopularCourses = (courses: course[]) => {
  const sortedCourses = _.orderBy(
    courses,
    ({ students }) => students || '',
    'desc'
  )
  const highestRatedCourses = sortedCourses.slice(0, 5)

  return highestRatedCourses
}
