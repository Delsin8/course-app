import { Link } from 'react-router-dom'
import style from './header.module.scss'
import { useContext, useState } from 'react'
import UserProfile from '../../features/userProfile/UserProfile'
import Search from '../../features/search/Search'
import DisplayWindow from '../../components/display-window/DisplayWindow'
import PurchasedCourses from '../../features/purchasedCourse/PurchasedCourses'
import Wishlist from '../../features/wishlist/Wishlist'
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
            <a href="https://github.com/Delsin8/course-app">Github</a>
          </li>
        </ul>

        <Search />

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
            <span className={style.lowOpacity}>|</span>
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
              <a href="https://github.com/Delsin8/course-app">Github</a>
            </div>
            {user ? (
              <Link to="/courses/list">
                <div> My courses/Wishlist</div>
              </Link>
            ) : (
              <div className={style.flexColumn}>
                <Link to="/signin">Signin</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
