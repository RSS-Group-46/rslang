import React from 'react';

const PuzzlePrompts = (props) => {
  const { translateEnabled, imageEnabled, doTranslate, doShowImage } = props;
  const translateClasses = `puzzle-prompt prompt_translate ${translateEnabled ? '' : 'disable'}`;
  const imageClasses = `puzzle-prompt prompt_image ${imageEnabled ? '' : 'disable'}`;
  return (
    <div className="puzzle-prompt_container">
      <div className={translateClasses} onClick={doTranslate} />
      <div className={imageClasses} onClick={doShowImage} />
    </div>
  );
}

export default PuzzlePrompts;