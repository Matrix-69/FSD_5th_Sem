import React from "react";
import ChildComponent from "./components/ChildComponent";
import GrandChild from "./components/GrandChild";
import GreatGrandChild from "./components/GreatGrandChild";

export const UserContext = React.createContext();
function App() {
  const msg = "Invitation for a function"
  const mymsg = "Hi this is GrandParent"

  return (
    <div>
      <h1>Hi I am Parent and I want to send {msg} to my greatgrandchild </h1>
      <ChildComponent msg={msg} />
      <UserContext.Provider value={msg}>
      </UserContext.Provider>
    </div>
  );
};


export default App;
