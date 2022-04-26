import { course2, filter } from '../../types'

export const getFilteredCourses = (courses: course2[], filters: filter[]) => {
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
