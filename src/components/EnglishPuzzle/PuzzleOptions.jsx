import React, { useContext } from 'react';
import PuzzleLevelPageOption from './PuzzleLevelPageOption';
import PuzzlePrompts from './PuzzlePrompts';
import { getContentWidth } from './puzzleUtils';
import { ScreenWidthContext } from './Puzzle';

const PuzzleOptions = (props) => {
  const { doTranslate, doShowImage, doChangeLevel, doChangePage, doCheckUseUserWords, doVoice, prompts, options } = props;
  const { hasTranslate, hasImageShown, hasVoice } = prompts;
  const { page, level, useUserWords } = options;
  return (
    <div
      className="puzzle-options_container"
      style={{ width: getContentWidth(useContext(ScreenWidthContext)) }}
    >
      <PuzzleLevelPageOption
        page={page}
        level={level}
        useUserWords={useUserWords}
        doChangeLevel={doChangeLevel}
        doChangePage={doChangePage}
        doCheckUseUserWords={doCheckUseUserWords}
      />
      <PuzzlePrompts
        translateEnabled={hasTranslate}
        imageEnabled={hasImageShown}
        voiceEnabled={hasVoice}
        doTranslate={doTranslate}
        doShowImage={doShowImage}
        doVoice={doVoice}
      />
    </div>
  );
}

export default PuzzleOptions;