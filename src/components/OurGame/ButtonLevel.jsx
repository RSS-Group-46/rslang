/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { TOTAL_GROUPS } from '../../constants/apiConstants';

const ButtonLevel = ({ handleLevel, level }) => {
  const arrLevel = [];
  for (let i = 1; i <= TOTAL_GROUPS; i += 1) {
    arrLevel.push(i);
  }
  return (
    <div className='level__our-game'>
      <h3>Level</h3>
      <select name='level' value={level+1} onChange={handleLevel}>
        {
          arrLevel.map((item) => (
            (level + 1) === item ? <option value={item} key={item}>{item}</option> : <option value={item} key={item}>{item}</option>
          ))
        }
      </select>
    </div>
  );
};

export default ButtonLevel;