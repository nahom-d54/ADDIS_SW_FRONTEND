import { createSlice } from "@reduxjs/toolkit";


const music = createSlice({
    name: 'music',
    initialState: {
        _id: null,
        title: "",
        artist: "",
        genre: "",
        duration: "",
        mimetype: "",
        path: ""
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