import React from 'react';

const PuzzleButtonToolbar = (props) => {
  const { isCompilled, isChecked, dontKnow, checkCompilledSentence, doContinue } = props;
  const needToShowDontKnowButton = !isCompilled;
  const needToShowCheckButton = (isCompilled && !isChecked);
  const needToShowContinueButton = isChecked;
  return (
    <div className="puzzle__button-toolbar">
      {needToShowDontKnowButton && <button type="button" className="btn btn-primary" onClick={dontKnow}>I don't know</button>}
      {needToShowCheckButton && !isChecked && <button type="button" className="btn btn-info" onClick={checkCompilledSentence}>Check</button>}
      {needToShowContinueButton && <button type="button" className="btn btn-success" onClick={doContinue}>Continue</button>}
    </div>
  );
}

export default PuzzleButtonToolbar;