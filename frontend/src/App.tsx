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
import CoursesListPage from './pages/Course/CoursesListPage'
import useCheck from './useCheck'

const App = () => {
  const [user, setUser] = useCheck()

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseID" element={<CoursePage />} />
          <Route path="/lessons/:lessonID" element={<LessonPage />} />

          <Route path="/courses/list" element={<CoursesListPage />} />
          <Route path="/reviews/:courseID" element={<ReviewsPage />} />

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
