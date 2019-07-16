import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './components/game';






class App extends Component {
  render() {
    return (
      <div className="container">
        <Game>game</Game>
      </div>
    );
  }
}

export default App;
