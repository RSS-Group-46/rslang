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
      <select name='level' onClick={handleLevel}>
        {
          arrLevel.map((item) => (
            (level + 1) === item ? <option value={item} key={item} selected>{item}</option> : <option value={item} key={item}>{item}</option>
          ))
        }
      </select>
    </div>
  );
};

export default ButtonLevel;