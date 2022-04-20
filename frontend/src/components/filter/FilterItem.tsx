import style from './filter.module.scss'

const FilterItem: React.FC = ({ children }) => {
  return <div className={style.filterItem}>{children}</div>
}

export default FilterItem
