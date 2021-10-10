import {createSlice} from '@reduxjs/toolkit'

export const userSlice=createSlice({
  name: "user",
  initialState:{value:{name:"", email:"",phone:0,dob:"",city:"",state:"",country:"",password:""}},
  reducers:{
      login:(state, action)=>{
          state.value=action.payload;
      },
      logout: (state)=>{
          state.value={name:"", email:"",phone:0,dob:"",city:"",state:"",country:"",password:""}
      }
  }
});
export const {login}=userSlice.actions;
export const {logout}=userSlice.actions;

export default userSlice.reducer;