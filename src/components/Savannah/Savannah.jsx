import React, { Component } from 'react';

class Savannah extends Component {
  constructor() {
    super();
    this.state = {
      word: 'Hello Savannah mini-game',
    };
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.word}</h1>
      </div>
    );
  }
}

export default Savannah;
