import React from 'react';
import { CONTENT_WIDTH } from './puzzleConstants';

const PuzzlePromptShow = (props) => {
  const { prompts } = props;
  const { translate, showTranslate } = prompts;
  return (
    <div 
      className="puzzle-prompt-show__translation"
      style={{ width: CONTENT_WIDTH }}
    >
      {showTranslate && <div>{translate}</div>}
    </div>
  )
}

export default PuzzlePromptShow;