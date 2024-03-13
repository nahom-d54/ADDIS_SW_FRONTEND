import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        _id: null,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        loggedIn: false
    },
    reducers: {
        loginUser: (state, action) => {
            const localUser = localStorage.getItem("localUser")
            if(!localUser) {
                state = action?.payload;
                localStorage.setItem("localUser",JSON.stringify(state))
            }else {
                state = JSON.parse(localUser)
            }
            state.loggedIn = true
            return state
        },
        logoutUser: (state) => {
            localStorage.removeItem("localUser")
            state = {
                username: null,
                email: null,
                firstName: null,
                lastName: null,
                loggedIn: false
            }
            return state
        },
        restoreSession: (state, action) => {
            state = JSON.parse(action.payload)
            state.loggedIn = true
            return state
        },
        setUserSlice: (state, action)=>{
            state = action.payload
            return state
        }

    }
})

export const { loginUser, logoutUser, restoreSession, setUserSlice } = user.actions
export default user.reducer
