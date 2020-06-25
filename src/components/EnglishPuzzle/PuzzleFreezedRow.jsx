import React from 'react';
import PuzzleElement from './PuzzleElement';
import { getPuzzleWidth, getPimpWidth, getPuzzleElementVariant } from './puzzleUtils';

const PuzzleFreezedRow = (props) => {
  const { sentence, rowNum, puzzleHeight } = props;
  const puzzleAmount = sentence.length;
  const pimpWidth = getPimpWidth(puzzleAmount);
  const puzzleWidth = getPuzzleWidth(puzzleAmount, pimpWidth);
  return (
    <div className="freezed_row">
      {
        sentence.map((w, i) =>
          <PuzzleElement
            key={i}
            variant={getPuzzleElementVariant(i, sentence.length)}
            puzzleWidth={puzzleWidth}
            pimpWidth={pimpWidth}
            puzzleHeight={puzzleHeight}
            rowNum={rowNum}
            puzzleNum={i}
            index={i}
          >
            {w.word}
          </PuzzleElement>
        )
      }
    </div>
  );
}

export default PuzzleFreezedRow;