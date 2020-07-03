import {
  GALLERY,
  GALLERY_FOLDER_NAME,
  START,
  END,
  MIDDLE,
  PIMP_WIDTH_PERCENT,
  START_LEVEL,
  START_PAGE,
  BORDER_LEVEL,
  BORDER_PAGE,
  MAX_SENTENCES
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

export const getContentWidth = (screenWidth) => {
  if (screenWidth > 1400) return 1400;
  if (screenWidth > 992) return 992;
  if (screenWidth > 768) return 768;
  if (screenWidth > 480) return 480;
  return 320;
}

export const getPuzzleWidth = (puzzleAmount, pimpWidth, screenWidth) => Math.floor(getContentWidth(screenWidth) / puzzleAmount) + pimpWidth;
export const getPimpWidth = (puzzleAmount, screenWidth) => Math.floor((getContentWidth(screenWidth) / puzzleAmount / 100) * PIMP_WIDTH_PERCENT);

export const getNextLevelPageOptions = (level, page) => {
  if ((level === BORDER_LEVEL) && (page === BORDER_PAGE)) {
    return {
      nextLevel: START_LEVEL,
      nextPage: START_PAGE
    }
  }
  if (page === BORDER_PAGE) {
    return {
      nextLevel: level + 1,
      nextPage: START_PAGE
    }
  }
  return {
    nextLevel: level,
    nextPage: page + 1
  }
}

export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i-=1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const mergeSentences = (sentences1, sentences2) => shuffle([...new Set([...sentences1, ...sentences2])]).slice(0, MAX_SENTENCES);