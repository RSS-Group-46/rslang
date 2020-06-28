import {
  GALLERY,
  GALLERY_FOLDER_NAME,
  START,
  END,
  MIDDLE,
  CONTENT_WIDTH,
  PIMP_WIDTH_PERCENT,
  START_LEVEL,
  START_PAGE,
  BORDER_LEVEL,
  BORDER_PAGE
} from './puzzleConstants';

export const getRandomImage = () => {
  const index = Math.floor(Math.random() * GALLERY.length);
  const choosedPicture = GALLERY[index];
  return {
    url: `${process.env.PUBLIC_URL}/${GALLERY_FOLDER_NAME}/${choosedPicture.fileName}.jpg`,
    ...choosedPicture
  };
}

export const getPuzzleTopSize = (rowNum, puzzleHeight) => {
  return rowNum * puzzleHeight;
}

export const getPuzzleLeftShift = (puzzleNum, puzzleWidth, pimpWidth) => {
  if (!puzzleNum) {
    return 0;
  }
  return (puzzleWidth * puzzleNum) - (pimpWidth * puzzleNum);
}

export const mapSentenceToWordWithId = (sentence) => {
  return sentence.map((word, i) => {
    return {
      word,
      id: `${word}_${i}`
    }
  });
};

export const getPuzzleElementVariant = (index, puzzlesLength) => {
  const finalIndex = (puzzlesLength - 1);
  switch (index) {
    case 0: return START;
    case finalIndex: return END;
    default: return MIDDLE;
  }
}

export const removeHtml = (text) => {
  return text.replace(/<\/?b>/g, '');
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  console.log(droppableSource.index)
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const getPuzzleWidthWithVariant = (width, variant, pimpWidth) => {
  if (variant === END) {
    return width - pimpWidth;
  }
  return width;
}

// export const getPuzzleWidth = (puzzleAmount) => Math.floor(CONTENT_WIDTH / puzzleAmount);

// export const getPimpWidth = (puzzleWidth) => Math.floor((puzzleWidth / 100) * PIMP_WIDTH_PERCENT);

export const getPuzzleWidth = (puzzleAmount, pimpWidth) => Math.floor(CONTENT_WIDTH / puzzleAmount) + pimpWidth;
export const getPimpWidth = (puzzleAmount) => Math.floor((CONTENT_WIDTH / puzzleAmount / 100) * PIMP_WIDTH_PERCENT);

export const getNextLevelPageOptions = (level, page) => {
  if ((level === BORDER_LEVEL) && (page === BORDER_PAGE)) {
    console.log('here')
    return {
      nextLevel: START_LEVEL,
      nextPage: START_PAGE
    }
  }
  if (page === BORDER_PAGE) {
    console.log('here2')
    return {
      nextLevel: level + 1,
      nextPage: START_PAGE
    }
  }
  console.log('here3')
  return {
    nextLevel: level,
    nextPage: page + 1
  }
}

export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}