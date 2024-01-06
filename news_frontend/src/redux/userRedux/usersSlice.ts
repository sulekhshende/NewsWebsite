import { createSlice } from "@reduxjs/toolkit";


const initialState : UserStateProps = {
    currentUser:null,
    isFetching: false,
    error: false
};
export type UserStateProps = {
    currentUser: CurrentUserType | null;
    isFetching:boolean;
    error:boolean;
}

export type CurrentUserType = {
    id: number;
    accessToken: string;
    createdAt: string;
    email: string;
    emailToken: string;
    isAdmin: boolean;
    isReporter: boolean;
    rep_approval: boolean;
    updatedAt: string;
    username: string
}
const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart:(state)=>{
            state.isFetching=true
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        logout: (state) => {
            state.currentUser = null;
        }
    }
});

export const { loginStart,loginSuccess,loginFailure, logout } = usersSlice.actions;
export default usersSlice.reducer;