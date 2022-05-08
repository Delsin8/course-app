import { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import style from './search.module.scss'

const Search = () => {
  const [search, setSearch] = useState('')

  return (
    <div className={style.searchWrapper}>
      <input
        className={style.search}
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
      />
      <span className={style.searchButton}>
        <Link to={`/courses?search=${search}`}>
          <BiSearch />
        </Link>
      </span>
    </div>
  )
}

export default Search
