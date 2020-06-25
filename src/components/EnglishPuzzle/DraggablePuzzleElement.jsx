import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MIDDLE } from './puzzleConstants';
import PuzzleElement from './PuzzleElement';

const GREEN_COLOR = '#4cbf00';
const RED_COLOR = '#f50000';

const getColor = (isCorrect) => {
  return isCorrect ? GREEN_COLOR : RED_COLOR;
}

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
    children: word,
  } = props;
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
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
          index={index}
          draggableProvided={provided}
        >
          {word}
        </PuzzleElement>

        // <div
        //   ref={provided.innerRef}
        //   {...provided.draggableProps}
        //   {...provided.dragHandleProps}
        //   className={puzzleClasses}
        //   style={{
        //     backgroundPosition,
        //     backgroundImage: showImage ? `url('${background}')` : null,
        //     width: `${getPuzzleWidthWithVariant(puzzleWidth, variant, pimpWidth)}px`,
        //     height: `${puzzleHeight}px`,
        //     left: `-${pimpWidth * index}px`,
        //     ...provided.draggableProps.style
        //   }}
        // >
        //   <div
        //     className="puzzle-element_word"
        //     style={{ backgroundColor: checkColor }}
        //   >
        //     {word}
        //   </div>
        // </div>
      )}
    </Draggable>
  );
}

export default DraggablePuzzleElement;