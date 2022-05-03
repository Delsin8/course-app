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
import LessonPage from './pages/Lesson/Lesson'
// import UserPage from './pages/User/UserPage'

const App = () => {
  return (
    <>
      <Header />
      <CoursePage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CoursePage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </>
  )
}

export default App
