import React, { useContext } from 'react';
import PuzzleElement from './PuzzleElement';
import { getPuzzleWidth, getPimpWidth, getPuzzleElementVariant } from './puzzleUtils';
import ScreenWidthContext from '../../contexts/screenWidth.context';

const PuzzleFreezedRow = (props) => {
  const { sentence, rowNum, puzzleHeight } = props;
  const puzzleAmount = sentence.length;
  const screenWidth = useContext(ScreenWidthContext);

  const pimpWidth = getPimpWidth(puzzleAmount, screenWidth);
  const puzzleWidth = getPuzzleWidth(puzzleAmount, pimpWidth, screenWidth);
  return (
    <div className="freezed_row">
      <div className="row-number">{rowNum + 1}</div>
      {
        sentence.map((w, i) =>
          <PuzzleElement
            key={w.word}
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