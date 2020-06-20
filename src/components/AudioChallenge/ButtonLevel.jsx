/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';

const ButtonLevel = ({ handleLevel, level }) => {
  const arrLevel = [];
  for (let i = 1; i < 7; i += 1) {
    arrLevel.push(i);
  }
  return (
    <div className='level__audio-call'>
      <h3>Level</h3>
      <select name='level' onChange={handleLevel}>
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