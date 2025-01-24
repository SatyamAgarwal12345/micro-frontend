import {configureStore} from '@reduxjs/toolkit'
import cartReducers from './cartSlice'

 const store = configureStore({
    reducer: {
      cart:cartReducers
    }
})

export default store