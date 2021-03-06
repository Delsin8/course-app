export type sortBy = 'price' | 'avg_rating' | 'students'

export type order = 'asc' | 'desc'

export interface Sort {
  sortBy: sortBy
  order: order
}

export interface sortingWindow {
  setSorting: Function
  showWindow: Function
}
