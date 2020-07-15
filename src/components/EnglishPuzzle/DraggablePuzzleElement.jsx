import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MIDDLE } from './puzzleConstants';
import PuzzleElement from './PuzzleElement';

const DraggablePuzzleElement = (props) => {
  const {
    variant = MIDDLE,
    puzzleWidth,
    pimpWidth,
    puzzleHeight,
    rowNum,
    puzzleNum,
    index,
    needToCheck = false,
    isCorrect,
    showImage,
    id,
    handleClick,
    children: word,
  } = props;
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <PuzzleElement
          variant={variant}
          puzzleWidth={puzzleWidth}
          pimpWidth={pimpWidth}
          puzzleHeight={puzzleHeight}
          rowNum={rowNum}
          puzzleNum={puzzleNum}
          needToCheck={needToCheck}
          isCorrect={isCorrect}
          showImage={showImage}
          handleClick={handleClick}
          index={index}
          draggableProvided={provided}
        >
          {word}
        </PuzzleElement>
      )}
    </Draggable>
  );
}

export default DraggablePuzzleElement;