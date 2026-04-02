import React, { useState } from 'react';

const App = () => {
    const [details, setDetails] = useState({
        name: "Tarun",
        counter: 0
    });

    function increaseValue() {
        setDetails(prev => ({
            ...prev,
            counter: prev.counter + 1
        }));
    }

    return (
        <div>
            <h1>{details.name} has clicked {details.counter} times</h1>
            <button onClick={increaseValue}>Increase</button>
        </div>
    );
}

export default App;
