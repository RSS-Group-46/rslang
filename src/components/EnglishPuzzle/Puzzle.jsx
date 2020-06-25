import React, { useState, useEffect, createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PuzzleOptions from './PuzzleOptions';
import PuzzleFreezedSentences from './PuzzleFreezedSentences';
import PuzzleCompilledSentence from './PuzzleCompilledSentence';
import PuzzleSentenceToCompile from './PuzzleSentenceToCompile';
import PuzzleButtonToolbar from './PuzzleButtonToolbar';
import PuzzlePromptShow from './PuzzlePromptShow';
import sentencesJson from './sentences.json';
import { getRandomImageUrl, mapSentenceToWordWithId, removeHtml, move, reorder } from './puzzleUtils';
import { CONTENT_WIDTH, STORE_DROPPABLE_ID, PICTURE_ROW_DROPPABLE_ID } from './puzzleConstants';
import './Puzzle.scss';

export const BackgroundContext = createContext('');

const promptsInitialState = {
  translate: '',
  showTranslate: false,
  showImage: false,
  hasTranslate: true,
  hasImageShown: true
}

const optionsInitialState = {
  page: 0,
  level: 0,
  useUserWords: true
}

const Puzzle = () => {
  const [sentences, setSentences] = useState(sentencesJson.map((s) => {
    return {
      sentence: removeHtml(s.textExample),
      translate: s.textExampleTranslate
    }
  }));
  const [freezedSentences] = useState([]);
  const [compilledSentence, setCompilledSentence] = useState([]);
  const [sentenceToCompile, setSentenceToCompille] = useState([]);
  const [sentenceInRightOrder, setSentenceInRightOrder] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [needToCheck, setNeedToCheck] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [puzzleHeight, setPuzzleHeight] = useState(0);
  const [prompts, setPrompts] = useState(promptsInitialState);
  const [options, setOptions] = useState(optionsInitialState);
  const [imageWidth] = useState(CONTENT_WIDTH);

  useEffect(() => {
    loadBackground();
    prepareNextSentence();
    if (imageHeight && sentences.length) {
      setPuzzleHeight(imageHeight / sentences.length);
    }
  }, [sentences, backgroundImage, imageHeight]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    source.droppableId === destination.droppableId ? doReorder(source, destination) : doMove(source, destination);
  }

  const doReorder = (source, destination) => {
    const isSentenceToCompile = source.droppableId === STORE_DROPPABLE_ID;
    const recompilled = reorder(
      isSentenceToCompile ? sentenceToCompile : compilledSentence,
      source.index,
      destination.index
    );
    isSentenceToCompile ? setSentenceToCompille(recompilled) : setCompilledSentence(recompilled);
  }

  const doMove = (source, destination) => {
    const sourceList = getListById(source.droppableId);
    const destinationList = getListById(destination.droppableId);
    const result = move(
      sourceList,
      destinationList,
      source,
      destination
    );
    setCompilledSentence(result[PICTURE_ROW_DROPPABLE_ID]);
    setSentenceToCompille(result[STORE_DROPPABLE_ID]);
  }

  const getListById = (droppableId) => droppableId === STORE_DROPPABLE_ID ? sentenceToCompile : compilledSentence;

  const loadBackground = () => {
    if (!!backgroundImage) {
      return;
    }
    console.log('loading background...')
    const background = getRandomImageUrl();
    const img = new Image();
    img.onload = () => {
      setBackgroundImage(background);
      setImageHeight(Math.floor(((img.height * CONTENT_WIDTH) / img.width)));
    }
    img.src = background;
  }

  const prepareNextSentence = () => {
    if (!sentences.length) {
      return;
    }
    console.log('preparing next sentence...');
    const next = sentences.shift();
    const sentenceInRightOrder = next.sentence.split(' ');
    const sentenceToCompile = mapSentenceToWordWithId(sentenceInRightOrder);

    setSentenceToCompille(sentenceToCompile);
    setSentenceInRightOrder(sentenceInRightOrder);
    setPrompts({
      ...promptsInitialState,
      translate: next.translate
    })
  }

  const dontKnow = () => {
    setSentenceToCompille([]);
    setCompilledSentence(mapSentenceToWordWithId(sentenceInRightOrder));
  }

  const checkCompilledSentence = () => {
    setNeedToCheck(true);
    if (JSON.stringify(compilledSentence.map((w) => w.word)) === JSON.stringify(sentenceInRightOrder)) {
      setIsChecked(true);
    }
  }

  const doContinue = () => {
    freezedSentences.push(compilledSentence)
    clearWorkzone();
    prepareNextSentence();
  }

  const clearWorkzone = () => {
    setCompilledSentence([]);
    setNeedToCheck(false);
    setIsChecked(false);
  }

  const doTranslate = () => {
    if (prompts.hasTranslate) {
      setPrompts({
        ...prompts,
        hasTranslate: false,
        showTranslate: true,
      })
    }
  }

  const doShowImage = () => {
    if (prompts.hasImageShown) {
      setPrompts({
        ...prompts,
        showImage: true,
        hasImageShown: false
      })
    }
  }

  const doChangeLevel = (e) => {
    const level = e.target.value;
    setOptions({
      ...options,
      level
    })
  }

  const doChangePage = (e) => {
    const page = e.target.value;
    setOptions({
      ...options,
      page
    })
  }

  const doCheckUseUserWords = (e) => {
    setOptions({
      ...options,
      useUserWords: !options.useUserWords
    })
  }

  return (
    // TODO delete wrapper when the main wrapper will be introduce
    <div className="puzzle_wrapper">
      <div className="puzzle_contaner" style={{ minWidth: CONTENT_WIDTH }}>
        <PuzzleOptions
          doTranslate={doTranslate}
          doShowImage={doShowImage}
          doChangeLevel={doChangeLevel}
          doChangePage={doChangePage}
          doCheckUseUserWords={doCheckUseUserWords}
          prompts={prompts}
          options={options}
        />
        <PuzzlePromptShow
          prompts={prompts}
        />
        <BackgroundContext.Provider value={backgroundImage}>
          <PuzzleFreezedSentences
            freezedSentences={freezedSentences}
            puzzleHeight={puzzleHeight}
          />
          <DragDropContext onDragEnd={onDragEnd}>
            <PuzzleCompilledSentence
              puzzleHeight={puzzleHeight}
              compilledSentence={compilledSentence}
              freezedLength={freezedSentences.length}
              puzzleAmount={sentenceInRightOrder.length}
              needToCheck={needToCheck}
              showImage={prompts.showImage}
            />
            <PuzzleSentenceToCompile
              sentenceToCompile={sentenceToCompile}
              puzzleHeight={puzzleHeight}
              puzzleAmount={sentenceInRightOrder.length}
              freezedLength={freezedSentences.length}
              showImage={prompts.showImage}
            />
          </DragDropContext>
          <PuzzleButtonToolbar
            isCompilled={!sentenceToCompile.length}
            isChecked={isChecked}
            dontKnow={dontKnow}
            checkCompilledSentence={checkCompilledSentence}
            doContinue={doContinue}
          />
        </BackgroundContext.Provider>
      </div>
    </div>
  )
}

export default Puzzle;