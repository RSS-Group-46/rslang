import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { getPuzzleElementVariant, getPuzzleWidth, getPimpWidth } from './puzzleUtils';
import DraggablePuzzleElement from './DraggablePuzzleElement';
import { CONTENT_WIDTH, WORD_ID_DELIMETER, PICTURE_ROW_DROPPABLE_ID } from './puzzleConstants';

const PuzzleCompilledSentence = (props) => {
  const { puzzleHeight, compilledSentence, freezedLength, needToCheck, puzzleAmount, showImage } = props;

  const pimpWidth = getPimpWidth(puzzleAmount);
  const puzzleWidth = getPuzzleWidth(puzzleAmount, pimpWidth);
  return (
    <Droppable droppableId={PICTURE_ROW_DROPPABLE_ID} direction="horizontal">
      {(provided, snapshot) => (
        <>
          <div
            className="puzzle__picture-row-placeholder"
            style={{
              width: CONTENT_WIDTH,
              height: puzzleHeight
            }}
          />
          <div
            className="puzzle__picture-row"
            style={{
              height: puzzleHeight
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {compilledSentence.map((w, i) => {
              const puzzleNum = Number(w.id.split(WORD_ID_DELIMETER)[1]);
              return (
                <DraggablePuzzleElement
                  key={i}
                  variant={getPuzzleElementVariant(i, puzzleAmount)}
                  puzzleWidth={puzzleWidth}
                  pimpWidth={pimpWidth}
                  puzzleHeight={puzzleHeight}
                  rowNum={freezedLength}
                  puzzleNum={puzzleNum}
                  needToCheck={needToCheck}
                  isCorrect={puzzleNum === i}
                  index={i}
                  id={w.id}
                  showImage={showImage}
                >
                  {w.word}
                </DraggablePuzzleElement>
              )
            }
            )}
            {provided.placeholder}
          </div>
        </>
      )}
    </Droppable>
  )
}

export default PuzzleCompilledSentence;