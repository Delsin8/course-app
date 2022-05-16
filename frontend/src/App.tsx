import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './style.scss'
import Header from './layouts/Header/Header'
import CoursesPage from './pages/Course/CoursesPage'
import CoursePage from './pages/Course/CoursePage'
import HomePage from './pages/Home/HomePage'
import SigninPage from './pages/Auth/SigninPage'
import SignupPage from './pages/Auth/SignupPage'
import LessonPage from './pages/Lesson/LessonPage'
import { UserContext } from './UserContext'
import { client } from './api/client'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import UserPage from './pages/User/UserPage'
import ReviewsPage from './pages/Reviews/ReviewsPage'
// import UserPage from './pages/User/UserPage'

const App = () => {
  const [user, setUser] = useState(false)
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(false)
        return
      }

      const url = 'http://localhost:5000/api/users/check'
      const res = await client.get(url, { headers: { 'x-api-key': token } })
      if (res.data?.valid === true) {
        setUser(true)
        return
      }
      setUser(false)
      return
    }

    checkUser()
  }, [])

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseID" element={<CoursePage />} />
          <Route path="/reviews/:courseID" element={<ReviewsPage />} />
          <Route path="/lessons/:lessonID" element={<LessonPage />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/user-settings" element={<UserPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
