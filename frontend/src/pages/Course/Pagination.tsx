import style from './course.module.scss'

interface pagination {
  coursesAmount: number
  coursesPerPage: number
  currentPage: number
  setPage: Function
}

const Pagination: React.FC<pagination> = ({
  coursesAmount,
  coursesPerPage,
  currentPage,
  setPage,
}) => {
  const arr: number[] = []
  const pages = Math.ceil(coursesAmount / coursesPerPage)
  for (let i = 1; i <= pages; i++) {
    arr.push(i)
  }

  return (
    <div className={style.paginationWrapper}>
      {arr.map(p => (
        <div
          key={p}
          className={`${style.paginationItem} ${
            currentPage === p ? style.paginationItemActive : ''
          }`}
          onClick={() => setPage(p)}
        >
          {p}
        </div>
      ))}
    </div>
  )
}

export default Pagination
