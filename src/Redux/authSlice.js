import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token : localStorage.getItem("token"),
    role : localStorage.getItem("role"),
}


const signupSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        removeSignupData(state, value){
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value){
            state.token = value.payload;
            localStorage.setItem("token", state.token);
        },
        removeToken(state, value){
            state.token = value.payload;
            localStorage.removeItem("token");
        },
        setRole(state, value){
            state.role = value.payload;
            localStorage.setItem("role", state.role);
        },
    }
})

export const { setSignupData, setLoading, setToken, removeToken, removeSignupData, setRole } = signupSlice.actions;
export default signupSlice.reducer;