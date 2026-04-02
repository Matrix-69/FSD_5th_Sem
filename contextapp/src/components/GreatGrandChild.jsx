import React, { useContext } from "react";
import { UserContext } from "../App";

const GreatGrandChild = ({ msg }) => {
  const mymsg = useContext(UserContext)
    
  return (
    <div>
      <p>Hi, I am GreatGrandChild and I received: {msg}</p>
      <p>This is the direct access to grand child {mymsg}</p>
    </div>
  );
};

export default GreatGrandChild;
