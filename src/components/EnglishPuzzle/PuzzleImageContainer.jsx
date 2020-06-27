import React, { useContext } from 'react';
import { BackgroundContext } from './Puzzle';

const PuzzleImageContainer = (props) => {
  const { imageHeight } = props;
  return (
    <div
      className="puzzle__image-container"
      style={{
        backgroundImage: `url('${useContext(BackgroundContext).url}')`,
        height: `${imageHeight}px`,
      }}
    />
  )
}

export default PuzzleImageContainer;