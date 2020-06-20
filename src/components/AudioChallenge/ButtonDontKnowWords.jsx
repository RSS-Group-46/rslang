import React from 'react';

const ButtonNextWords = ({handleButtonDontKnow, state }) => {

  return (
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <button type="button" tabIndex='0' className="btn btn-secondary" autoFocus onClick={handleButtonDontKnow}>
      {!state ? 'I don`t know':'Next'}
    </button>
  );
};
export default ButtonNextWords;