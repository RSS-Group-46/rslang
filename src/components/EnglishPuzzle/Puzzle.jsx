import React, { useState, useEffect, createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PuzzleOptions from './PuzzleOptions';
import PuzzleFreezedSentences from './PuzzleFreezedSentences';
import PuzzleCompilledSentence from './PuzzleCompilledSentence';
import PuzzleSentenceToCompile from './PuzzleSentenceToCompile';
import PuzzleButtonToolbar from './PuzzleButtonToolbar';
import PuzzlePromptShow from './PuzzlePromptShow';
import PuzzleImageContainer from './PuzzleImageContainer';
import ResultsModal from './ResultsModal';
import { getRandomImage, mapSentenceToWordWithId, removeHtml, move, reorder, getNextLevelPageOptions, shuffle } from './puzzleUtils';
import { CONTENT_WIDTH, STORE_DROPPABLE_ID, PICTURE_ROW_DROPPABLE_ID, MAX_WORDS, MAX_SENTENCES, START_PAGE, START_LEVEL } from './puzzleConstants';
import { ONLY_USER_WORDS } from '../../constants/apiConstants';
import { getWords } from '../../services/common.service';
import useUserAggregatedWords from '../../hooks/userAggregatedWords.hook';
import useAuth from '../../hooks/auth.hook';
import './Puzzle.scss';

export const BackgroundContext = createContext({ url: '', pictureName: '' });

const promptsInitialState = {
  translate: '',
  showTranslate: false,
  showImage: false,
  hasTranslate: true,
  hasImageShown: true
}

const optionsInitialState = {
  page: START_PAGE,
  level: START_LEVEL,
  useUserWords: true
}

const normalizeSentences = (sentences) => {
  const mapped = sentences
    .map((w) => {
      return {
        sentence: removeHtml(w.textExample),
        translate: w.textExampleTranslate,
      }
    })
    .filter((s) => s.sentence.split(' ').length <= MAX_WORDS);

  return mapped;
}

const Puzzle = () => {
  const [sentences, setSentences] = useState([]);
  const [freezedSentences, setFreezedSentences] = useState([]);
  const [compilledSentence, setCompilledSentence] = useState([]);
  const [sentenceToCompile, setSentenceToCompille] = useState([]);
  const [sentenceInRightOrder, setSentenceInRightOrder] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [needToCheck, setNeedToCheck] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [puzzleHeight, setPuzzleHeight] = useState(0);
  const [prompts, setPrompts] = useState(promptsInitialState);
  const [options, setOptions] = useState(optionsInitialState);
  const [puzzleIsCompilled, setPuzzleIsCompilled] = useState(false);

  const { token, userId } = useAuth();
  const wordsConfig = { userId, token, group: options.level, wordsPerPage: MAX_WORDS, filter: ONLY_USER_WORDS };
  const { data, error, loading } = useUserAggregatedWords(wordsConfig);
  const userSentences = normalizeSentences(data && data[0].paginatedResults || []);

  useEffect(() => {
    loadBackground();
    if (imageHeight) {
      setPuzzleHeight(imageHeight / MAX_SENTENCES);
    }
  }, [backgroundImage, imageHeight]);

  useEffect(() => {
    if (sentenceToCompile.length) {
      return;
    }
    prepareNextSentence();
  }, [sentences]);

  useEffect(() => {
    restartGame();
  }, [options]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    source.droppableId === destination.droppableId ? doReorder(source, destination) : doMove(source, destination);
  }

  const getAndSetWords = () => {
    if (sentences.length) {
      return;
    }
    const { page, level } = options;
    getWords(level, page, MAX_WORDS).then(newSentences => {
      const normalized = normalizeSentences(newSentences);
      const merged = options.useUserWords ? mergeSentences(userSentences, normalized) : normalized;
      setSentences(merged);
    });
  }

  const mergeSentences = (sentences1, sentences2) => shuffle([...new Set([...sentences1, ...sentences2])]).slice(0, MAX_SENTENCES);

  const doReorder = (source, destination) => {
    if (needToCheck) {
      setNeedToCheck(false);
    }
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
    const background = getRandomImage();
    const img = new Image();
    img.onload = () => {
      setBackgroundImage(background);
      setImageHeight(Math.floor(((img.height * CONTENT_WIDTH) / img.width)));
      getAndSetWords();
    }
    img.src = background.url;
  }

  const prepareNextSentence = () => {
    if (!sentences.length) {
      return;
    }
    const next = sentences.shift();
    const sentenceInRightOrder = next.sentence.split(' ');
    const sentenceToCompile = shuffle(mapSentenceToWordWithId(sentenceInRightOrder));

    setSentenceToCompille(sentenceToCompile);
    setSentenceInRightOrder(sentenceInRightOrder);
    setPrompts({
      ...promptsInitialState,
      translate: next.translate
    })
  }

  const finishGame = () => {
    setPuzzleIsCompilled(true);
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
    if (puzzleIsCompilled) {
      upgradeLevel();
    } else {
      freezedSentences.push(compilledSentence);
      clearWorkzone();
      if (!sentences.length) {
        finishGame();
      } else {
        prepareNextSentence();
      }
    }
  }

  const upgradeLevel = () => {
    const { level, page } = options;
    const { nextLevel, nextPage } = getNextLevelPageOptions(level, page);
    setOptions({
      ...options,
      level: nextLevel,
      page: nextPage
    })
  }

  const showResults = () => {
    
  }

  const restartGame = () => {
    clearWorkzone();
    setSentences([]);
    setSentenceToCompille([]);
    setFreezedSentences([]);
    setPuzzleIsCompilled(false);
    setBackgroundImage(null);
  }

  const clearWorkzone = () => {
    setCompilledSentence([]);
    setNeedToCheck(false);
    setIsChecked(false);
    setPrompts(promptsInitialState);
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
    const level = Number(e.target.value);
    setOptions({
      ...options,
      level
    })
  }

  const doChangePage = (e) => {
    const page = Number(e.target.value);
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
          {puzzleIsCompilled &&
            <PuzzleImageContainer imageHeight={imageHeight} />
          }
          {!puzzleIsCompilled &&
            <PuzzleFreezedSentences
              freezedSentences={freezedSentences}
              puzzleHeight={puzzleHeight}
            />
          }
          <DragDropContext onDragEnd={onDragEnd}>
            {!puzzleIsCompilled &&
              <PuzzleCompilledSentence
                puzzleHeight={puzzleHeight}
                compilledSentence={compilledSentence}
                freezedLength={freezedSentences.length}
                puzzleAmount={sentenceInRightOrder.length}
                needToCheck={needToCheck}
                showImage={prompts.showImage}
              />
            }
            {puzzleIsCompilled &&
              <div className="puzzle__picture-row round-end"
                style={{ height: puzzleHeight }}
              >
                <p>{backgroundImage.pictureName}</p>
              </div>
            }
            <PuzzleSentenceToCompile
              sentenceToCompile={sentenceToCompile}
              puzzleHeight={puzzleHeight}
              puzzleAmount={sentenceInRightOrder.length}
              freezedLength={freezedSentences.length}
              showImage={prompts.showImage}
            />
          </DragDropContext>
          <PuzzleButtonToolbar
            puzzleIsCompilled={puzzleIsCompilled}
            sentenceIsCompilled={!sentenceToCompile.length}
            isChecked={isChecked}
            dontKnow={dontKnow}
            checkCompilledSentence={checkCompilledSentence}
            doContinue={doContinue}
          />
          <ResultsModal 
            
          />
        </BackgroundContext.Provider>
      </div>
    </div>
  )
}

export default Puzzle;