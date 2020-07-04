import React, { useContext } from 'react';
import { PUZZLE_ELEMENT, CLASS_NAMES } from './puzzleConstants';
import { getPuzzleLeftShift, getPuzzleTopSize, getPuzzleWidthWithVariant } from './puzzleUtils';
import BackgroundContext from '../../contexts/puzzleBackground.context';

const SUCCESS_COLOR = '#4cbf00';
const UNSUCCESS_COLOR = '#f50000';

const getColor = (isCorrect) => isCorrect ? SUCCESS_COLOR : UNSUCCESS_COLOR;

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
  const backgroundUrl = useContext(BackgroundContext).url;
  return (
    <div
      ref={draggableProvided && draggableProvided.innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className={puzzleClasses}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
      style={{
        backgroundPosition,
        backgroundImage: showImage ? `url('${backgroundUrl}')` : null,
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