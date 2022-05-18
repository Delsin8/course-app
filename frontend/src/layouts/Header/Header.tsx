import { Link } from 'react-router-dom'
import style from './header.module.scss'
import { useContext, useState } from 'react'
import UserProfile from '../../components/userProfile/UserProfile'
import Search from '../../feature/search/Search'
import DisplayWindow from '../../components/display-window/DisplayWindow'
import PurchasedCourses from '../../feature/purchasedCourse/PurchasedCourses'
import Wishlist from '../../feature/wishlist/Wishlist'
import { UserContext } from '../../UserContext'

import { GiFlowerTwirl } from 'react-icons/gi'
import { IoMdMenu } from 'react-icons/io'
import { VscBook } from 'react-icons/vsc'
import { GrFavorite } from 'react-icons/gr'
import { HiUserCircle } from 'react-icons/hi'

const Header = () => {
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)
  const { user } = useContext(UserContext)

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
            <Link to="/courses">Courses</Link>
          </li>
          <li className={style.inactive}>
            <Link to="/">Github</Link>
          </li>
        </ul>
        {/* search */}
        <Search />
        {/* user */}
        {user ? (
          <div className={`${style.userSection} ${style.inactiveFlex}`}>
            <DisplayWindow
              icon={<VscBook />}
              link="/courses/list"
              component={<PurchasedCourses />}
            />
            <DisplayWindow
              icon={<GrFavorite />}
              link="/courses/list"
              component={<Wishlist />}
            />
            <DisplayWindow
              component={<UserProfile />}
              icon={<HiUserCircle style={{ fontSize: '2.5rem' }} />}
            />
          </div>
        ) : (
          <div className={`${style.authButtons} ${style.inactiveFlex}`}>
            <Link to="/signup">Signup</Link>
            <span style={{ color: 'black', opacity: '0.1' }}>|</span>
            <Link to="/signin">Signin</Link>
          </div>
        )}
        {/* mobile */}
        <div className={style.mobileMenuButton}>
          <IoMdMenu onClick={() => setIsOpenedMenu(!isOpenedMenu)} />
        </div>
        {isOpenedMenu && (
          <div className={style.mobileMenu}>
            <div>
              <Link to="/courses">Courses</Link>
            </div>
            <div>
              <Link to="/">Github</Link>
            </div>
            {user ? (
              <Link to="/courses/list">
                <div> My courses/Wishlist</div>
              </Link>
            ) : (
              <>
                <Link to="/signin">Signin</Link>
                <Link to="/signin">Signup</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
