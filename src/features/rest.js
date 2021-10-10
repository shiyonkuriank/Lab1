import {createSlice} from '@reduxjs/toolkit'

export const restSlice=createSlice({
  name: "rest",
  initialState:{value:{name:"", email:"",phone:0,city:"",password:""}},
  reducers:{
      restlogin:(state, action)=>{
          state.value=action.payload;
      },
      restlogout: (state)=>{
          state.value={name:"", email:"",phone:0,city:"",password:""}
      }
  }
});
export const {restlogin}=restSlice.actions;
export const {restlogout}=restSlice.actions;

export default restSlice.reducer;