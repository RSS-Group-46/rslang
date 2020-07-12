import React from 'react';

const PuzzlePrompts = (props) => {
  const { translateEnabled, imageEnabled, voiceEnabled, doTranslate, doShowImage, doVoice } = props;
  const translateClasses = `puzzle-prompt prompt_translate ${translateEnabled ? '' : 'disable'}`;
  const imageClasses = `puzzle-prompt prompt_image ${imageEnabled ? '' : 'disable'}`;
  const voiceClasses = `puzzle-prompt prompt_voice ${voiceEnabled ? '' : 'disable'}`;
  return (
    <div className="puzzle-prompt_container">
      <div className={translateClasses} onClick={doTranslate} onKeyDown={doTranslate} role="button" tabIndex={0} />
      <div className={imageClasses} onClick={doShowImage} onKeyDown={doShowImage} role="button" tabIndex={0} />
      <div className={voiceClasses} onClick={doVoice} onKeyDown={doVoice} role="button" tabIndex={0} />
    </div>
  );
}

export default PuzzlePrompts;