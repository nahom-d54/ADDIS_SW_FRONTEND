import { createSlice } from "@reduxjs/toolkit";

const genres = createSlice({
    name: 'genres',
    initialState: [],
    reducers: {
        addGenreSlice: (state, action) => {
            state.push(action.payload)
        },
        removeGenreSlice: (state, action) => {
            state = state.filter(genre => genre._id != action.payload)
        },
        getgenreByIdSlice: (state, action) => {
            return state.filter(genre => genre._id === action.payload)
        },
        setGenresSlice: (state, action) => {
            state = action.payload
            
            return state
        }
    }
})

export default genres.reducer
export const { setGenresSlice, addGenreSlice, removeGenreSlice, getGenresSlice, getgenreByIdSlice } = genres.actions