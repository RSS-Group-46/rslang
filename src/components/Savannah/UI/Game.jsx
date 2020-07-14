/* eslint-disable react/no-array-index-key */
import React from 'react';
import Life from './life';
import Button from './buttons';

const Game = ({ lifes, buttons, word }) => {
  return (
    <div className="savannah-game">
      <h1 className="drop">{word}</h1>
      <div className="buttons">
        {buttons.map((button, index) => {
          return <Button value={button} number={index + 1} key={index} />;
        })}
      </div>
      <div className="lifes">
        {lifes.get().map((life, idx) => {
          return <Life key={idx + 1} />;
        })}
      </div>
    </div>
  );
};

export default Game;
