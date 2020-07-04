import React from 'react';

const ProgressRound = ({current, size}) => {
  
  return (
    <div className="progress" >
      <div
        className="progress-bar bg-warning"
        role="progressbar"
        style={{width: `${current * 100 / size}%`}}
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
       />
    </div>
  );
};

export default ProgressRound;
