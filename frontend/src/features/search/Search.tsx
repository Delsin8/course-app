import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import style from './search.module.scss'

interface search {
  heroSection?: boolean
}

const Search: React.FC<search> = ({ heroSection }) => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value)
      navigate(`/courses?search=${search}`)
    }
  }
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
        onKeyDown={e => handleSearch(e)}
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
