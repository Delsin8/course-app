export interface Course {
  _id: string
  title: string
  description: string
  authors: string[]
  price: number
  preview_video: string
  language: string
  created_at: Date
  updated_at: Date
}

export interface course2 {
  _id: string
  title: string
  description: string
  authors: string[]
  price: number
  lessons: number
  //
  duration: number
  avg_rating: number
  votes: number
  students: number
  //
  // language: string
  // created_at: Date
  // updated_at: Date
}

// real one
export interface course {
  _id: string
  title: string
  description: string
  authors: string[]
  sections: section[]
  price: number
  preview_video: string
  language: string
  created_at: Date
  updated_at: Date
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
  duration: number
}

export interface lesson {
  _id: string
  title: string
  description: string
  duration: number
  section: string
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
