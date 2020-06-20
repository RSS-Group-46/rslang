/* eslint-disable jsx-a11y/no-onchange */ 
import React from 'react';

const ButtonRound = ({ handleRound, round }) => {
  const arrRound = [];
  for (let i = 1; i < 31; i += 1) {
    arrRound.push(i);
  }
  return (
    <div className='round__audio-call'>
      <h3>Round</h3>
      <select name='page' onChange={handleRound}>
        {arrRound.map((item) => (
          (round + 1) === item ? <option value={item} key={item} selected >{item}</option> : <option value={item} key={item} >{item}</option>
        ))}
      </select>
    </div>
  );
};
export default ButtonRound;