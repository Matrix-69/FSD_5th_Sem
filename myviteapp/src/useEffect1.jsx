import React, { useEffect, useState } from 'react'

const App = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `${count} new messages`;
    });

  return (
    <div>
      <h1>{count} new messages! </h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default App
