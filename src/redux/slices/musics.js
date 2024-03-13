import { createSlice } from "@reduxjs/toolkit";

const musics = createSlice({
    name: 'musics',
    initialState:{
        first: null,
        prev: null,
        next: null,
        last: null,
        pages: null,
        items: null,
        data:[],
        loading: null,
        error: null
    },
    reducers: {
        startMusicsSlice: (state, action) => {
            // try to extract the other parameters too
            state = action.payload
            state.loading = false
            state.error = ''
            return state
        },
        addMusicSlice:(state, action) => {
            state.data.push(action.payload)
            return state
        },
        editMusicSlice: (state, action ) => {
            state.data = state.data.map( i => i._id === action.payload._id ? action.payload: i )
            return state
        },
        deleteMusicSlice: (state, action) => {
            state.data = state.data.filter( i => i._id != action.payload._id )
            return state
        },
        // expirement
        isLoading: (state) => {
            state.loading = true
            state.error = ''
        },
        error: (state, action) => {
            state.loading = false
            state.error = action.payload.data
        }

    }
})

export const { addMusicSlice, editMusicSlice, deleteMusicSlice, startMusicsSlice, isLoading, error } = musics.actions;
export default musics.reducer;