import React, { Component } from 'react'
import Wishme from './Components/Wishme';
import Wishmefn from './Components/Wishmefn';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';  

export default class App extends Component {
  render() {
    const userName = 'Tarun';
    const userNameFn = 'Tarun Function';
    return (
      <div>
        <Wishme un={userName} />
        <Wishmefn un={userNameFn} />
        <Button> primary </Button>
      </div>
    )
  }
}
