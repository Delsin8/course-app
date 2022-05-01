import { useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import style from './search.module.scss'

const Search = () => {
  const searchRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className={style.searchWrapper}>
      <input ref={searchRef} className={style.search} placeholder="Search..." />
      <span className={style.searchButton}>
        <Link to={`/courses?search=${searchRef.current}`}>
          <BiSearch />
        </Link>
      </span>
    </div>
  )
}

export default Search
