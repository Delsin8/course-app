import { course2, filter } from '../types'

export const getFilteredCourses = (courses: course2[], filters: filter[]) => {
  return courses.filter(c => {
    const showMinPrice = isShowByMinPrice(c, filters)
    const showMaxPrice = isShowByMaxPrice(c, filters)
    const showRating = isShowByRating(c, filters)
    const showDuration = isShowByDuration(c, filters)

    return showMinPrice && showMaxPrice && showRating && showDuration
  })
}

export const getCoursesAmount = (courses: course2[]) => {
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

// filtering functions
const isShowByMinPrice = (course: course2, filters: filter[]) => {
  const priceFromFilter = filters.find(f => f.type === 'price_from')
  if (!priceFromFilter) return true

  if (course.price >= priceFromFilter?.value) return true
  return false
}
const isShowByMaxPrice = (course: course2, filters: filter[]) => {
  const priceToFilter = filters.find(f => f.type === 'price_to')
  if (!priceToFilter) return true

  if (course.price <= priceToFilter?.value) return true
  return false
}
const isShowByRating = (course: course2, filters: filter[]) => {
  const ratingFilter = filters.find(f => f.type === 'rating')
  if (!ratingFilter || ratingFilter.value === -1) return true

  if (course.avg_rating >= ratingFilter.value) return true
  return false
}
const isShowByDuration = (course: course2, filters: filter[]) => {
  const durationFilter = filters.filter(f => f.type === 'duration')
  if (!durationFilter.length) return true

  const isExists = durationFilter.filter(
    f =>
      (f.value === 'short' && course.duration < 6 * 60) ||
      (f.value === 'medium' &&
        course.duration > 6 * 60 &&
        course.duration < 12 * 60) ||
      (f.value === 'long' && course.duration >= 12 * 60)
  )
  if (isExists.length) return true
  return false
}
