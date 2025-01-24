import {createSlice} from "@reduxjs/toolkit"
const initialState = 20
const cakeSlice = createSlice({
    name:cake,
    initialState,
    reducers:{
        increment:(state,action)=>{
          return state+1
        },
        decrement:(state,action)=>{
          return  state-1
        }
    }
})

export const { increment, decrement } = cakeSlice.actions;
export default cakeSlice.reducer;