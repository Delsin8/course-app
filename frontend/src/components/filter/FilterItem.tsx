import { filter } from '../../../types'
import style from './filter.module.scss'

const FilterItem: React.FC<filter> = ({ type, value }) => {
  return (
    <div className={style.filterItem}>
      {(type === 'price_from' && 'from') ||
        (type === 'price_to' && 'to') ||
        type}
      : {type === 'rating' && value === -1 ? 'all' : value}
    </div>
  )
}

export default FilterItem
