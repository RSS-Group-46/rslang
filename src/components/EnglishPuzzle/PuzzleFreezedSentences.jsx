import React from 'react';
import PuzzleFreezedRow from './PuzzleFreezedRow';

const PuzzleFreezedSentences = (props) => {
  const { freezedSentences, puzzleHeight } = props;
  return (
    <div className="puzzle__freezed">
      {freezedSentences.map((freezedSentence, i) =>
        <PuzzleFreezedRow
          sentence={freezedSentence}
          puzzleHeight={puzzleHeight}
          rowNum={i}
          key={i}
        />
      )}
    </div>
  )
}

export default PuzzleFreezedSentences;