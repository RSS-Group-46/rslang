import React, { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggablePuzzleElement from './DraggablePuzzleElement';
import { getPuzzleElementVariant, getPuzzleWidth, getPimpWidth } from './puzzleUtils';
import { WORD_ID_DELIMETER } from './puzzleConstants';
import { ScreenWidthContext } from './Puzzle';

const STORE_DROPPABLE_ID = 'store-droppable';

const PuzzleSentenceToCompile = (props) => {
  const { sentenceToCompile, puzzleHeight, freezedLength, puzzleAmount, showImage, moveToCompilled } = props;
  const screenWidth = useContext(ScreenWidthContext);

  const pimpWidth = getPimpWidth(puzzleAmount, screenWidth);
  const puzzleWidth = getPuzzleWidth(puzzleAmount, pimpWidth, screenWidth);
  return (
    <Droppable droppableId={STORE_DROPPABLE_ID} direction="horizontal">
      {(provided, snapshot) => (
        <div className="puzzle__unsetted_container"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {sentenceToCompile.map((w, i) =>
            <DraggablePuzzleElement
              key={i}
              variant={getPuzzleElementVariant(i, puzzleAmount)}
              puzzleWidth={puzzleWidth}
              pimpWidth={pimpWidth}
              puzzleHeight={puzzleHeight}
              rowNum={freezedLength}
              puzzleNum={Number(w.id.split(WORD_ID_DELIMETER)[1])}
              handleClick={() => moveToCompilled(w)}
              index={i}
              id={w.id}
              showImage={showImage}
            >
              {w.word}
            </DraggablePuzzleElement>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default PuzzleSentenceToCompile;