import React from 'react';

const ButtonNextWords = ({ handleButtonDontKnow, state }) => {
  return (
    <div className='wrapper__btn-next'>
      <button
        type="button"
        tabIndex="0"
        className="btn btn-secondary"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onClick={handleButtonDontKnow}
      >
        {!state ? 'I don`t know' : 'Next'}
      </button>
    </div>
  );
};
export default ButtonNextWords;
