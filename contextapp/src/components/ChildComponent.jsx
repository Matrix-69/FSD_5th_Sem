import React from "react";
import GrandChild from "./GrandChild";
const ChildComponent = ({ msg }) => {

  return (
    <div>
      <p>Hi, I am Child and I received: "{msg}"</p>
      <GrandChild msg={msg} />
    </div>
  );
};

export default ChildComponent;
