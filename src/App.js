import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './components/game';
import Nav from './components/nav';




class App extends Component {
  render() {
    return (
      <div className="container">
        <Nav></Nav>
        <Game>game</Game>
      </div>
    );
  }
}

export default App;
