// src/GreetingCardClass.js
import React from 'react';
// This is a class component that receives 'props'.
class GreetingCardClass extends React.Component {
  render() {
    // In a class component, you access props using 'this.props'.
    // For example, if you pass <GreetingCardClass name="David" />,
    // you would access it as this.props.name.
    return (
      <div>
        <h2>Hello from Class Component, {this.props.name}!</h2>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
export default GreetingCardClass;
