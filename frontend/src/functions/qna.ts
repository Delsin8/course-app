import { SubmitHandler } from 'react-hook-form'
import { client } from '../api/client'

// export interface inputQustion {
//   title: string
//   body: string
//   lessonID: string
// }
// export const handleQuestioning: SubmitHandler<inputQustion> = async ({
//   body,
//   title,
// }) => {
//   try {
//     const url = `/api/questions`
//     const token = localStorage.getItem('token')
//     await client.post(url, JSON.stringify({ lesson: lessonID, body, title }), {
//       headers: {
//         'x-api-key': token,
//       },
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
