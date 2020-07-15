import React, { useState, useContext } from 'react';
import { getContentWidth } from './puzzleUtils';
import ScreenWidthContext from '../../contexts/screenWidth.context';

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
      style={{ width: getContentWidth(useContext(ScreenWidthContext)) }}
    >
      <div className={showVoiceClasses} onClick={doPlayVoice} onKeyDown={doPlayVoice} role="button" tabIndex={0} />
      <div className={showTranslateClasses}>{translate}</div>
    </div>
  )
}

export default PuzzlePromptShow;