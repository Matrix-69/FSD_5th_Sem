import React, { Component } from 'react'
import GreetingProps from './Components/GreetingProps';
import GreetingPropsFn from './Components/GreetingPropsFn';

export default class App extends Component {

  render() {
    const name = 'Tarun';
    const message = 'How are you'
    return (
      <div>
        <GreetingProps username = {name} msg = {message} />
        <GreetingPropsFn username = {name} msg = {message} />
      </div>
    )
  }
}
