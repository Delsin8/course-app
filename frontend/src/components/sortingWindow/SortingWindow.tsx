import { useState } from 'react'
import { ContainedButton, OutlinedButton } from '../button/Button'
import { order, sortBy, sortingWindow } from './sort.types'
import style from './sortingWindow.module.scss'
import { HiSortAscending, HiSortDescending, HiStar } from 'react-icons/hi'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { BsFillPeopleFill } from 'react-icons/bs'

const SortingWindow: React.FC<sortingWindow> = ({ setSorting, showWindow }) => {
  const [sortBy, setSortBy] = useState<sortBy>()
  const [order, setOrder] = useState<order>()

  const handleSetSorting = (
    sortBy: sortBy = 'students',
    order: order = 'desc'
  ) => {
    const sortingObj = { sortBy, order }
    setSorting(sortingObj)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.sortingWindowWrapper}>
        <div className={style.sortWrapper}>
          <div
            className={`${style.btn} ${style.rating} ${
              sortBy === 'avg_rating' ? style.active : ''
            }`}
            onClick={() => setSortBy('avg_rating')}
          >
            <HiStar />
            Rating
          </div>
          <div
            className={`${style.btn} ${style.price} ${
              sortBy === 'price' ? style.active : ''
            }`}
            onClick={() => setSortBy('price')}
          >
            <FaRegMoneyBillAlt />
            Price
          </div>
          <div
            className={`${style.btn} ${style.students} ${
              sortBy === 'students' ? style.active : ''
            }`}
            onClick={() => setSortBy('students')}
          >
            <BsFillPeopleFill />
            Students
          </div>
        </div>
        <div className={style.sortWrapper}>
          <div
            className={`${style.sortingOrder} ${
              order === 'asc' ? style.active : ''
            }`}
            onClick={() => setOrder('asc')}
          >
            <HiSortAscending />
            Ascending
          </div>
          <div
            className={`${style.sortingOrder} ${
              order === 'desc' ? style.active : ''
            }`}
            onClick={() => setOrder('desc')}
          >
            <HiSortDescending />
            Descending
          </div>
        </div>
        <div
          className={style.controlButtonsWrapper}
          onClick={() => handleSetSorting(sortBy, order)}
        >
          <div onClick={() => showWindow(false)}>
            <OutlinedButton
              color="black"
              outlineColor="black"
              padding="4px 12px"
            >
              Close
            </OutlinedButton>
          </div>
          <ContainedButton
            backgroundColor="black"
            color="white"
            padding="4px 12px"
          >
            Sort
          </ContainedButton>
        </div>
      </div>
    </div>
  )
}

export default SortingWindow
