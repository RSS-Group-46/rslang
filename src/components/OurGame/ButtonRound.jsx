/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { PAGES_PER_GROUP } from '../../constants/apiConstants';

const ButtonRound = ({ handleRound, round }) => {
  const arrRound = [];
  for (let i = 1; i <= PAGES_PER_GROUP; i += 1) {
    arrRound.push(i);
  }
  return (
    <div className='round__our-game'>
      <h3>Round</h3>
      <select name='page' defaultValue={round+1} onChange={handleRound}>
        {arrRound.map((item) => (
          <option value={item} key={item} >{item}</option>
        ))}
      </select>
    </div>
  );
};
export default ButtonRound;