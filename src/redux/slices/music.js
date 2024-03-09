import { createSlice } from "@reduxjs/toolkit";


const music = createSlice({
    name: 'music',
    initialState: {
        id: null,
        title: "",
        artist: "",
        genre: "",
        duration: ""
        },
    reducers: {
        setMusicSlice: (state, action) => {
            state = action.payload
            
            return state
        }

    }
})

export const { setMusicSlice } = music.actions;
export default music.reducer