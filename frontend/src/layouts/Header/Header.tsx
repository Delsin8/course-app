import { Link } from 'react-router-dom'
import style from './header.module.scss'
import { GiFlowerTwirl } from 'react-icons/gi'
import { useRef, useState } from 'react'
import { OutlinedButton } from '../../components/button/Button'
import UserProfile from '../../components/userProfile/UserProfile'
import Search from '../../feature/search/Search'
import { IoMdMenu } from 'react-icons/io'

const Header = () => {
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)
  const user = false

  return (
    <header>
      <nav className={style.wrapper}>
        <ul>
          <li>
            <Link to="/">
              <GiFlowerTwirl className={style.logo} />
            </Link>
          </li>
          <li className={style.inactive}>
            <Link to="/course">Course</Link>
          </li>
          <li className={style.inactive}>
            <Link to="/">Github</Link>
          </li>
        </ul>
        {/* search */}
        <Search />
        {/* user */}
        {user ? (
          <UserProfile />
        ) : (
          <Link to="/signup" className={style.inactive}>
            <OutlinedButton color="#7814A7" outlineColor="#7814A7">
              Signup
            </OutlinedButton>
          </Link>
        )}
        {/* mobile */}
        <div className={style.mobileMenuButton}>
          <IoMdMenu onClick={() => setIsOpenedMenu(!isOpenedMenu)} />
        </div>
        {isOpenedMenu && (
          <div className={style.mobileMenu}>
            <div>
              <Link to="/course">Course</Link>
            </div>
            <div>
              <Link to="/">Github</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
