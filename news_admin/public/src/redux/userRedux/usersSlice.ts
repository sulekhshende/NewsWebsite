import { createSlice } from "@reduxjs/toolkit";
//import { UserType } from "../../types/user";


const initialState : UserStateProps = {
    currentUser:null,
    isFetching: false,
    error: false,
    location: null
};
export type UserStateProps = {
    currentUser: CurrentUserType | null;
    isFetching:boolean;
    error:boolean;
    location?: number | null;
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
    username: string;
    
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
        },
        setLocation : (state,action)=>{
            state.location = action.payload
        }
    }
});

export const { loginStart,loginSuccess,loginFailure, logout, setLocation } = usersSlice.actions;
export default usersSlice.reducer;