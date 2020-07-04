import React, { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { getPuzzleElementVariant, getPuzzleWidth, getPimpWidth, getContentWidth } from './puzzleUtils';
import DraggablePuzzleElement from './DraggablePuzzleElement';
import { WORD_ID_DELIMETER, PICTURE_ROW_DROPPABLE_ID } from './puzzleConstants';
import ScreenWidthContext from '../../contexts/screenWidth.context';

const PuzzleCompilledSentence = (props) => {
  const {
    puzzleHeight,
    compilledSentence,
    freezedLength,
    needToCheck,
    puzzleAmount,
    showImage,
    sentenceInRightOrder
  } = props;
  const screenWidth = useContext(ScreenWidthContext);

  const pimpWidth = getPimpWidth(puzzleAmount, screenWidth);
  const puzzleWidth = getPuzzleWidth(puzzleAmount, pimpWidth, screenWidth);
  return (
    <Droppable droppableId={PICTURE_ROW_DROPPABLE_ID} direction="horizontal">
      {(provided) => (
        <>
          <div
            className="puzzle__picture-row-placeholder"
            style={{
              width: getContentWidth(screenWidth),
              height: puzzleHeight
            }}
          >
            <div className="row-number active">{freezedLength + 1}</div>
          </div>
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
                  key={w.id}
                  variant={getPuzzleElementVariant(i, puzzleAmount)}
                  puzzleWidth={puzzleWidth}
                  pimpWidth={pimpWidth}
                  puzzleHeight={puzzleHeight}
                  rowNum={freezedLength}
                  puzzleNum={puzzleNum}
                  needToCheck={needToCheck}
                  isCorrect={sentenceInRightOrder[i] === w.word}
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