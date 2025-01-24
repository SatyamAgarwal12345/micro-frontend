import {createSlice} from "@reduxjs/toolkit"
const initialState = 20
const iceCreamSlice = createSlice({
    name:icecream,
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

export const { increment, decrement } = iceCreamSlice.actions;
export default iceCreamSlice.reducer;