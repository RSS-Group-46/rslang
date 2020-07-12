import React from 'react';

const MiniGameRoundEntity = (props) => {
  const { round } = props;
  const { time, correct, wrong } = round;
  return (
    <div className="statistics__mini-games_entity">
      <span>date:</span>
      <span className="badge badge-info">{time}</span>
      <span>guessed words:</span>
      <span className="badge badge-pill badge-success">{correct}</span>
      <span>unguessed words:</span>
      <span className="badge badge-pill badge-warning">{wrong}</span>
    </div>
  );
}

export default MiniGameRoundEntity;