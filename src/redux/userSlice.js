import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    token: null,
    isLogin: false
}

export const userSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
            state.isLogin = true;
        },

        register: (state, action) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
            state.isLogin = true;
        },

        edit: (state, action) => {
            state.userData = action.payload.userData;
        },

        logout: (state) => {
            state.userData = null;
            state.token = null;
            state.isLogin = false;
            localStorage.clear();
        }
    }
})

export const { login, register, logout, edit } = userSlice.actions;
export default userSlice.reducer