import React from 'react';

const BtnNextRepeat = ({ handleRepeat, handleNext }) => {
  return (
    <div className="btn-listen__our-game">
      <button type="button" onClick={handleRepeat}>
        REPEAT
      </button>
      <button type="button" onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
};

export default BtnNextRepeat;
