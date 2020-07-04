import React, { useContext } from 'react';
import { getContentWidth } from './puzzleUtils';
import ScreenWidthContext from '../../contexts/screenWidth.context';

const PuzzleButtonToolbar = (props) => {
  const {
    puzzleIsCompilled,
    sentenceIsCompilled,
    isChecked,
    dontKnow,
    checkCompilledSentence,
    doContinue,
    showResults
  } = props;
  const needToShowDontKnowButton = (!sentenceIsCompilled && !puzzleIsCompilled);
  const needToShowCheckButton = (sentenceIsCompilled && !puzzleIsCompilled && !isChecked);
  const needToShowContinueButton = isChecked || puzzleIsCompilled;
  return (
    <div
      className="puzzle__button-toolbar"
      style={{ width: getContentWidth(useContext(ScreenWidthContext)) }}
    >
      {needToShowDontKnowButton && <button type="button" className="btn btn-primary" onClick={dontKnow}>I don&apos;t know</button>}
      {needToShowCheckButton && !isChecked && <button type="button" className="btn btn-info" onClick={checkCompilledSentence}>Check</button>}
      {needToShowContinueButton && <button type="button" className="btn btn-success" onClick={doContinue}>Continue</button>}
      {puzzleIsCompilled && <button type="button" className="btn btn-info" onClick={showResults}>Results</button>}
    </div>
  );
}

export default PuzzleButtonToolbar;