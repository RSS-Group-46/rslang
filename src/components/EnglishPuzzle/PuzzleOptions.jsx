import React from 'react';
import PuzzleLevelPageOption from './PuzzleLevelPageOption';
import PuzzlePrompts from './PuzzlePrompts';

const PuzzleOptions = (props) => {
  const { doTranslate, doShowImage, doChangeLevel, doChangePage, doCheckUseUserWords, prompts, options } = props;
  const { hasTranslate, hasImageShown } = prompts;
  const { page, level, useUserWords } = options;
  return (
    <div className="puzzle-options_container">
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
        doTranslate={doTranslate}
        doShowImage={doShowImage}
      />
    </div>
  );
}

export default PuzzleOptions;