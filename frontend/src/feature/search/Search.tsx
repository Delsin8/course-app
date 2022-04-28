import { useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import style from './search.module.scss'

const Search = () => {
  const searchRef = useRef(null)

  return (
    <div className={style.searchWrapper} onClick={() => console.log(searchRef)}>
      <input ref={searchRef} className={style.search} placeholder="Search..." />
      <span className={style.searchButton}>
        <BiSearch />
      </span>
    </div>
  )
}

export default Search
