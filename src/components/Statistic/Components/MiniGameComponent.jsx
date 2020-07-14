import React, { useState } from 'react';
import MiniGameRoundEntity from './MiniGameRoundEntity';

const MiniGameComponent = (props) => {
  const [show, setShow] = useState(false);
  const { game } = props;
  const { name, rounds } = game;

  const componentBodyClasses = `card-body ${show ? '' : 'hide'}`
  return (
    <div className="statistics__mini-games_component card border-primary">
      <div className="card-header" 
        onClick={() => setShow(!show)} 
        onKeyDown={() => setShow(!show)} 
        role="button" 
        tabIndex={0}
      >
        <h4>{name[0].toUpperCase() + name.slice(1)}</h4>
      </div>
      <div className={componentBodyClasses}>
        {rounds.map((round) => <MiniGameRoundEntity key={JSON.stringify(round.time)} round={round} />)}
      </div>
    </div>
  )
}

export default MiniGameComponent;