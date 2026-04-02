import React from 'react'
import {increment, decrement} from './actions'
import { useState, useDispatch, useSelector } from 'react-redux'

const App = () => {
    const count = useSelector((state)=>
        state.count);
    const dispatch = useDispatch();
  return (
    <div>
      <h1> 0 </h1>
      <button onClick={()=>dispatch(increment())}> Increment </button>
      <button onClick={()=>dispatch(decrement())}> Decrement </button>
    </div>
  )
}

export default App
