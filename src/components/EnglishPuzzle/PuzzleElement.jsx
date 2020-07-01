import React, { useContext } from 'react';
import { PUZZLE_ELEMENT, CLASS_NAMES } from './puzzleConstants';
import { getPuzzleLeftShift, getPuzzleTopSize, getPuzzleWidthWithVariant } from './puzzleUtils';
import { BackgroundContext } from './Puzzle';

const GREEN_COLOR = '#4cbf00';
const RED_COLOR = '#f50000';

const getColor = (isCorrect) => {
  return isCorrect ? GREEN_COLOR : RED_COLOR;
}

const PuzzleElement = (props) => {
  const {
    variant,
    puzzleWidth,
    pimpWidth,
    puzzleHeight,
    rowNum,
    puzzleNum,
    needToCheck = false,
    isCorrect,
    showImage = true,
    handleClick,
    index,
    draggableProvided = {},
    children: word,
  } = props;
  const puzzleClasses = `${PUZZLE_ELEMENT} ${CLASS_NAMES[variant]}`;
  const backgroundPosition = `top -${getPuzzleTopSize(rowNum, puzzleHeight)}px left -${getPuzzleLeftShift(puzzleNum, puzzleWidth, pimpWidth)}px`;
  const checkColor = needToCheck ? getColor(isCorrect) : null;
  const {
    draggableProps = {},
    dragHandleProps = { style: {} }
  } = draggableProvided;
  return (
    <div
      ref={draggableProvided && draggableProvided.innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className={puzzleClasses}
      onClick={handleClick}
      style={{
        backgroundPosition,
        backgroundImage: showImage ? `url('${useContext(BackgroundContext).url}')` : null,
        width: `${getPuzzleWidthWithVariant(puzzleWidth, variant, pimpWidth)}px`,
        height: `${puzzleHeight}px`,
        left: `-${pimpWidth * index}px`,
        ...draggableProps.style
      }}
    >
      <div
        className="puzzle-element_word"
        style={{ backgroundColor: checkColor }}
      >
        {word}
      </div>
    </div>
  )
}

export default PuzzleElement;