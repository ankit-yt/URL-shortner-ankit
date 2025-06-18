import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
  isAuthenticated:false,
  isLoading:false

};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
         login: (state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
         },
         logout: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
         },
         isLoading: (state,action)=>{
            state.isLoading = action.payload;
         }

    }
})

export const {login,logout,isLoading} = authSlice.actions;
export default authSlice.reducer;