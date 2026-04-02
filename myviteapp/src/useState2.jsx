import React, { useEffect, useState } from 'react';

const App = () => {
    const [count, setCount] = useState(0);
    const [otherCount, setOtherCount] = useState(0);

    useEffect(() => {
        document.title = `${otherCount} new messages`;
    }, [otherCount]);

    return (
        <div>
            <h1>{count} new messages! </h1>
            <button onClick={() => setCount(count + 1)}>Increase</button>

            <h2>Other Count: {otherCount}</h2>
            <button onClick={() => setOtherCount(otherCount + 5)}>Increase by 5</button>
        </div>
    );
};

export default App;
