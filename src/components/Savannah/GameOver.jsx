import React from 'react';
import { NavLink } from 'react-router-dom';

const GameOver = () => {
  return (
    <div className="container">
      <h1>Game Over</h1>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Play again?
      </button>
      <NavLink className="btn btn-outline-primary" type="buttom" to="/">
        Back to home page
      </NavLink>
    </div>
  );
};

export default GameOver;
