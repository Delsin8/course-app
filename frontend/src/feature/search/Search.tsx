import { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import style from './search.module.scss'

interface search {
  heroSection?: boolean
}

const Search: React.FC<search> = ({ heroSection }) => {
  const [search, setSearch] = useState('')

  return (
    <div
      className={`${style.searchWrapper} ${
        heroSection ? style.heroSectionWrapper : ''
      }`}
    >
      <input
        className={`${style.search} ${
          heroSection ? style.heroSectionSearch : ''
        }`}
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
      />
      <span
        className={`${style.searchButton} ${
          heroSection ? style.heroSectionSearchButon : ''
        }`}
      >
        <Link to={`/courses?search=${search}`}>
          <BiSearch />
        </Link>
      </span>
    </div>
  )
}

export default Search
