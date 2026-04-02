import React, { useState } from 'react'

const App = () => {
    const [counter, setCounter] = useState(0);
    const [name, setName] = useState("");

    function increaseCounter() {
        setCounter(counter + 1);
    }
  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <h1>
        {name} has clicked {counter} times!!
      </h1>
      <button onClick={increaseCounter}>Increase</button>
    </div>
  )
}

export default App
