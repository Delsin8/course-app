import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const defaultData = [{
    title: 'title_test',
    description: 'desc_test',
    authors: ['asd', 'qwe'],
    price: 5,
    preview_video: 'prev_test',
    language: 'eng',
    created_at: new Date(),
    updated_at: new Date()
},
{
    title: 'second',
    description: 'desc_test',
    authors: ['qwe', 'zxc'],
    price: 5,
    preview_video: 'prev_test',
    language: 'eng',
    created_at: new Date(),
    updated_at: new Date()
},
{
    title: 'third',
    description: 'desc_test',
    authors: ['ahysd', 'qwhnge'],
    price: 5,
    preview_video: 'prev_test',
    language: 'eng',
    created_at: new Date(),
    updated_at: new Date()
}]

const userData = {
    id: 14,
    username: "Jack",
    likedCourses: 0
}

interface g {
    task: {
        id: number,
        name: string,
        status: string
    }[]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: defaultData,
    reducers: {}
})

export const userSlice = createSlice({
    name: 'user',
    initialState: userData,
    reducers: {
        like: (state) => {
            state.likedCourses += 1
        },
        dislike: (state) => {
            state.likedCourses -= 1
        }
    }
})

export const { like, dislike } = userSlice.actions