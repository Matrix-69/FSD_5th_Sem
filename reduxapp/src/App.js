import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Redux Counter Example</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}

export default App;
