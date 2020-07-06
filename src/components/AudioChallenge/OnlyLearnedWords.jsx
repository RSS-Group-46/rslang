import React from 'react';

const OnlyLearnedWords = ({ handleOnlyLearnedWords }) => {
  return (
    <div className='knowing-words' role="presentation" onClick={handleOnlyLearnedWords}>Only learned words</div>
  );
}

export default OnlyLearnedWords;