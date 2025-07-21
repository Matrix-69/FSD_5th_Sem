import React, { useState } from 'react';
import GreetingPropsFn from './Components/GreetingPropsFn';

const App = () => {
  const [userName, setuserName] = useState('Tarun');
  const [message, setMessage] = useState('Welcome to React');

  return (
    <div>
      <h1>I am parent</h1>
      <GreetingPropsFn uName={userName} message={message} />
    </div>
  );
};

export default App;
