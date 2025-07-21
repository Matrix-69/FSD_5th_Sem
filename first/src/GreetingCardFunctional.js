// src/App.js (Temporary modification to see functional component)
import React from 'react';
import GreetingCardFunctional from './GreetingCardFunctional'; // Import the functional component
class App extends React.Component {
  render() {
    const user3Name = "Frank";
    const user3Message = "Functional components are neat!";
    return (
      <div>
        <h1>My React App with Class Components & Functional Props</h1>

        {/* Using GreetingCardFunctional and passing variables as props */}
        <GreetingCardFunctional name={user3Name} message={user3Message} />
      </div>
    );
  }
}
export default App;



// // src/GreetingCardFunctional.js
// import React from 'react';

// // This is a functional component. It receives 'props' directly as an argument.
// const GreetingCardFunctional = (props) => {
//   // Or, you can destructure props directly in the function signature:
//   // const GreetingCardFunctional = ({ name, message }) => {
//   return (
//     <div>
//       {/* We access the 'name' property directly from the props argument */}
//       <h2>Hello from Functional Component, {props.name}!</h2>
//       {/* We access the 'message' property directly from the props argument */}
//       <p>{props.message}</p>
//     </div>
//   );
// };
// export default GreetingCardFunctional;
