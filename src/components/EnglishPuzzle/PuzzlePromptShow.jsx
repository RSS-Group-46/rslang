import React from 'react';

const PuzzlePromptShow = (props) => {
  const { prompts } = props;
  const { translate, showTranslate } = prompts;
  return (
    <div>
      {showTranslate && <div className="puzzle-prompt-show__translation">{translate}</div>}
    </div>
  )
}

export default PuzzlePromptShow;