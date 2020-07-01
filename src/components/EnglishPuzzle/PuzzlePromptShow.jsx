import React, { useState } from 'react';
import { CONTENT_WIDTH } from './puzzleConstants';

const ENDED_EVENT_NAME = 'ended';

const PuzzlePromptShow = (props) => {
  const [audioPlay, setAudioPlay] = useState(false);

  const { prompts } = props;
  const { translate, showTranslate, showVoice, audioExampleUrl } = prompts;

  const doPlayVoice = () => {
    const audio = new Audio(audioExampleUrl);
    audio.addEventListener(ENDED_EVENT_NAME, () => setAudioPlay(false));
    setAudioPlay(true);
    audio.play();
  };
  const showVoiceClasses = `prompts_element puzzle-prompt prompt_speaker ${!showVoice && 'hide'} ${audioPlay && 'disable'}`;
  const showTranslateClasses = `prompts_element ${!showTranslate && 'hide'}`;
  return (
    <div
      className="puzzle-prompt-show__prompts"
      style={{ width: CONTENT_WIDTH }}
    >
      <div className={showVoiceClasses} onClick={doPlayVoice} />
      <div className={showTranslateClasses}>{translate}</div>
    </div>
  )
}

export default PuzzlePromptShow;