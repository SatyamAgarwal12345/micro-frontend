import React from 'react'
import { Provider } from 'react-redux'
import IceCream from './IceCream'
import store from '../redux/store'

const NewIC = () => {
  return (
    <Provider store={store} >
    <div >
      <IceCream />
    </div>
  </Provider>
  )
}

export default NewIC
