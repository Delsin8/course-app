import { filter } from '../../types'
import style from './filter.module.scss'

interface filterItem {
  filter: filter
  removeFilter: (f: filter) => void
}

const FilterItem: React.FC<filterItem> = ({ filter, removeFilter }) => {
  const { type, value } = filter

  return (
    <div className={style.filterItem} onClick={() => removeFilter(filter)}>
      {(type === 'price_from' && 'from') ||
        (type === 'price_to' && 'to') ||
        type}
      : {type === 'rating' && value === -1 ? 'all' : value}
    </div>
  )
}

export default FilterItem
