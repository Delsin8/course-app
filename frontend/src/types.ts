import { ReactNode } from 'react'

export interface course {
  _id: string
  title: string
  description: string
  price: number
  lessons: number
  duration: number
  avg_rating: number
  votes: number
  students: number
  language: string
  thumbnail?: string
  created_at: Date
  updated_at: Date
}

export interface coursePopulated extends course {
  authors: author[]
  sections: section[]
  reviews: review[]
}

export interface user {
  _id: string
  first_name: string
  last_name: string
  profession?: string
}

export interface section {
  _id: string
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'All levels'
  lessonsAmount: number
  lessons: lesson[]
  course: string
  duration: number
}

export interface lesson {
  _id: string
  title: string
  description: string
  duration: number
  section: section
  questions: question[]
}

export interface question {
  _id: string
  title: string
  body: string
  user: user
  answers: answer[]
}

export interface answer {
  _id: string
  body: string
  user: user
  question: string
}

export interface filter {
  type: 'price_from' | 'price_to' | 'rating' | 'duration'
  value: any
}

export interface tab {
  name: string
  content: ReactNode
  icon?: JSX.Element
}

export interface wishlist {
  user: user
  courses: course[]
}

export interface author extends user {
  students: number
  courses_owned: number
  bio?: string
}

export interface review {
  _id: string
  body: string
  course: string
  user: user
  rating: 1 | 2 | 3 | 4 | 5
  is_edited: boolean
  created_at: Date
  updated_at: Date
}
