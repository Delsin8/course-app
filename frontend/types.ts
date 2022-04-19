export interface Course {
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
  title: string
  description: string
  authors: string[]
  price: number
  lessons: number
  //
  duration: number
  rating: number
  votes: number
  students: number
  //
  // language: string
  // created_at: Date
  // updated_at: Date
}
