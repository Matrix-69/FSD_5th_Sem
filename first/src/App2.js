import React, { Component } from 'react'
import Greeting from './Components/Greeting'
import Introduction from './Components/Introduction'
import Hobbies from './Components/Hobbies'
import Qualification from './Components/Qualification'
import Skills from './Components/Skills'
import Personal from './Components/Personal' 

export default class App extends Component {
  render() {
    const uname = this.props.name || 'Tarun'
    return (
      <div>
        <h1>I am parent i.e App.js</h1>
        <h2>Greetings to you {uname}</h2>
        <Greeting />
        <Introduction />
        <Hobbies />
        <Qualification />
        <Skills />
        <Personal />
      </div>
    )
  }
}