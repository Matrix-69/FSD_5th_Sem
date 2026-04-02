import React from "react";
import GreatGrandChild from "./GreatGrandChild";

const GrandChild = ({ msg }) => {
  return (
    <div>
      <p>Hi, I am GrandChild and I received: "{msg}"</p>
      <GreatGrandChild msg={msg} />
    </div>
  );
};

export default GrandChild;
