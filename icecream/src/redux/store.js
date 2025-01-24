import {configureStore} from '@reduxjs/toolkit'
import iceCreamReducers from './cartSlice'

 const store = configureStore({
    reducer: {
      icecream:iceCreamReducers
    }
})

export default store