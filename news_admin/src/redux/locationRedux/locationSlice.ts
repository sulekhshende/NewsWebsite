import { createSlice } from "@reduxjs/toolkit";
//import { UserType } from "../../types/user";


const initialState : LocationState = {
   currentLocation:null

};
export type LocationState = {
   currentLocation: number | null;
}

export type currentLocationType = {
    id: number;
    createdAt: string;
    updatedAt: string;
    
}
const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        getLocation:(state,action)=>{
            state.currentLocation=action.payload
        },
    }
});

export const { getLocation} = locationSlice.actions;
export default locationSlice.reducer;