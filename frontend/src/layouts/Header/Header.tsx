import { Link } from 'react-router-dom'
import style from './header.module.scss'
import { useContext, useEffect, useState } from 'react'
import { OutlinedButton } from '../../components/button/Button'
import UserProfile from '../../components/userProfile/UserProfile'
import Search from '../../feature/search/Search'
import DisplayWindow from '../../components/display-window/DisplayWindow'
import PurchasedCourses from '../../feature/purchasedCourse/PurchasedCourses'
import Wishlist from '../../feature/wishlist/Wishlist'
import { client } from '../../api/client'
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
              component={<PurchasedCourses />}
              icon={<VscBook />}
            />
            <DisplayWindow component={<Wishlist />} icon={<GrFavorite />} />
            <DisplayWindow
              component={<UserProfile />}
              icon={<HiUserCircle style={{ fontSize: '2.5rem' }} />}
            />
          </div>
        ) : (
          // <PurchasedCourseMain />
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
              <Link to="/courses">Courses</Link>
            </div>
            <div>
              <Link to="/">Github</Link>
            </div>
            <div>
              <DisplayWindow
                component={<PurchasedCourses />}
                icon={<VscBook />}
              />
              <DisplayWindow component={<Wishlist />} icon={<GrFavorite />} />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
