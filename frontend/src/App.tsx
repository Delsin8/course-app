import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
// import Signup from './pages/Signup'
import Course from './pages/Course/CoursePage'

import './style.scss'
import Header from './layouts/Header/Header'
import CoursesPage from './pages/Course/CoursesPage'
import CoursePage from './pages/Course/CoursePage'
import HomePage from './pages/Home/HomePage'
import SigninPage from './pages/Auth/SigninPage'
import SignupPage from './pages/Auth/SignupPage'
import LessonPage from './pages/Lesson/LessonPage'
// import UserPage from './pages/User/UserPage'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses/:courseID" element={<CoursePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/lessons/:lessonID" element={<LessonPage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </>
  )
}

export default App
