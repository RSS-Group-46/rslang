import React from 'react';

const ButtonNextWords = ({handleButtonDontKnow, state}) => {

  return (
    <button type="button" className="btn btn-secondary" onClick={handleButtonDontKnow}>
      {!state ? 'I don`t know':'Next'}
    </button>
  );
};
export default ButtonNextWords;
