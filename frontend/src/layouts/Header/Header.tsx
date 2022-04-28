import { Link } from 'react-router-dom'
import style from './header.module.scss'
import { GiFlowerTwirl } from 'react-icons/gi'
import { useRef } from 'react'
import { OutlinedButton } from '../../components/button/Button'
import UserProfile from '../../components/userProfile/UserProfile'
import Search from '../../feature/search/Search'

const Header = () => {
  const user = false

  return (
    <nav className={style.wrapper}>
      <ul>
        <li>
          <Link to="/">
            <GiFlowerTwirl className={style.logo} />
          </Link>
        </li>
        <li>
          <Link to="/course">Course</Link>
        </li>
        <li>
          <Link to="/">Github</Link>
        </li>
      </ul>
      {/* search */}
      <Search />
      {/* user */}
      {user ? (
        <UserProfile />
      ) : (
        <Link to="/signup">
          <OutlinedButton color="#7814A7" outlineColor="#7814A7">
            Signup
          </OutlinedButton>
        </Link>
      )}
    </nav>
  )
}

export default Header
