import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import style from '../../components/display-window/displayWindow.module.scss'

const UserProfile = () => {
  const { setUser } = useContext(UserContext)
  const logout = () => {
    localStorage.removeItem('token')
    setUser(false)
  }

  return (
    <div className={style.container}>
      <Link
        to={`/user-settings`}
        className={`${style.flex} ${style.item} ${style.nowrap}`}
      >
        User Settings
      </Link>
      <div className={`${style.flex} ${style.item}`} onClick={logout}>
        Logout
      </div>
    </div>
  )
}

export default UserProfile
