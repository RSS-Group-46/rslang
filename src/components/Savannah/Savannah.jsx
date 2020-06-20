import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Savannah.scss';
import Queue from '../../utils/Queue';

const lifes = new Queue(['*', '*', '*', '*', '*']);
class Savannah extends Component {
  constructor() {
    super();
    this.state = {
      word: 'Hello Savannah mini-game',
      lifes: lifes.get(),
    };
  }

  render() {
    return (
      <div className="container">
        <div>
          <button className="btn btn-warning btn-2" type="button">
            button-1
          </button>
          <button className="btn btn-warning btn-2" type="button">
            button-2
          </button>
        </div>
        <div>
          <button className="btn btn-warning btn-3" type="button">
            button-3
          </button>
          <button className="btn btn-warning btn-4" type="button">
            button-4
          </button>
        </div>
        <div>
          {this.state.lifes.map((el) => {
            return (
              <FontAwesomeIcon
                key={el + Math.random()}
                icon={faStar}
                className="m-2"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Savannah;
