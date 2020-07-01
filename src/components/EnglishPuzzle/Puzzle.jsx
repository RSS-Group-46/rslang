import React, { useState, useEffect, createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PuzzleOptions from './PuzzleOptions';
import PuzzleFreezedSentences from './PuzzleFreezedSentences';
import PuzzleCompilledSentence from './PuzzleCompilledSentence';
import PuzzleSentenceToCompile from './PuzzleSentenceToCompile';
import PuzzleButtonToolbar from './PuzzleButtonToolbar';
import PuzzlePromptShow from './PuzzlePromptShow';
import PuzzleImageContainer from './PuzzleImageContainer';
import PuzzleResultsModal from './PuzzleResultsModal';
import { getRandomImage, mapSentenceToWordWithId, removeHtml, move, reorder, getNextLevelPageOptions, shuffle, getContentWidth } from './puzzleUtils';
import { STORE_DROPPABLE_ID, PICTURE_ROW_DROPPABLE_ID, MAX_WORDS, MAX_SENTENCES, START_PAGE, START_LEVEL } from './puzzleConstants';
import { ONLY_USER_WORDS } from '../../constants/apiConstants';
import { getWords } from '../../services/common.service';
import useUserAggregatedWords from '../../hooks/userAggregatedWords.hook';
import useWindowDimensions from '../../hooks/useWindowDimensions.hook';
import useAuth from '../../hooks/auth.hook';
import { getDataUrl } from '../../hooks/words.hook';
import './Puzzle.scss';

export const BackgroundContext = createContext({ url: '', pictureName: '' });
export const ScreenWidthContext = createContext(0);

const promptsInitialState = {
  translate: '',
  audioExampleUrl: '',
  showTranslate: false,
  showImage: false,
  showVoice: false,
  hasTranslate: true,
  hasImageShown: true,
  hasVoice: true
}

const optionsInitialState = {
  page: START_PAGE,
  level: START_LEVEL,
  useUserWords: true
}

const resultsInitialState = {
  guessed: [],
  unguessed: []
}

const normalizeSentences = (sentences) => {
  const mapped = sentences
    .map((w) => {
      return {
        sentence: removeHtml(w.textExample),
        translate: w.textExampleTranslate,
        audioExample: w.audioExample
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
  const [results, setResults] = useState(resultsInitialState);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [nativeImageDimensions, setNativeImageDimensions] = useState({ width: 0, height: 0 });
  const [needToCheck, setNeedToCheck] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [puzzleHeight, setPuzzleHeight] = useState(0);
  const [prompts, setPrompts] = useState(promptsInitialState);
  const [options, setOptions] = useState(optionsInitialState);
  const [puzzleIsCompilled, setPuzzleIsCompilled] = useState(false);
  const [needToShowResults, setNeedToShowResults] = useState(false);

  const { token, userId } = useAuth();
  const wordsConfig = { userId, token, group: options.level, wordsPerPage: MAX_WORDS, filter: ONLY_USER_WORDS };
  const { data, error, loading } = useUserAggregatedWords(wordsConfig);
  const userSentences = normalizeSentences(data && data[0].paginatedResults || []);

  const { width: screenWidth } = useWindowDimensions();

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

  useEffect(() => {
    const { width, height } = nativeImageDimensions;
    setImageHeight(Math.floor(((height * getContentWidth(screenWidth)) / width)));
  }, [screenWidth]);

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
      const { width, height } = img;
      setNativeImageDimensions({ width, height })
      setImageHeight(Math.floor(((height * getContentWidth(screenWidth)) / width)));
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
      translate: next.translate,
      audioExampleUrl: getDataUrl(next.audioExample)
    })
  }

  const finishGame = () => {
    setPuzzleIsCompilled(true);
  }

  const dontKnow = () => {
    setSentenceToCompille([]);
    setCompilledSentence(mapSentenceToWordWithId(sentenceInRightOrder));
    addUnguessed(sentenceInRightOrder.join(' '));
  }

  const addUnguessed = (unguessed) => results.unguessed.push(unguessed);

  const addGuessed = (guessed) => results.guessed.push(guessed);

  const checkCompilledSentence = () => {
    setNeedToCheck(true);
    if (JSON.stringify(compilledSentence.map((w) => w.word)) === JSON.stringify(sentenceInRightOrder)) {
      setIsChecked(true);
    }
  }

  const doContinue = () => {
    const previousSentence = sentenceInRightOrder.join(' ');
    if (!results.unguessed.includes(previousSentence)) {
      addGuessed(previousSentence);
    }
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

  const restartGame = () => {
    clearWorkzone();
    setSentences([]);
    setSentenceToCompille([]);
    setFreezedSentences([]);
    setPuzzleIsCompilled(false);
    setBackgroundImage(null);
  }

  const clearWorkzone = () => {
    setResults(resultsInitialState);
    setNeedToShowResults(false);
    setCompilledSentence([]);
    setNeedToCheck(false);
    setIsChecked(false);
    setPrompts(promptsInitialState);
  }

  const moveToCompilled = (word) => {
    const compilledSentenceClone = Array.from(compilledSentence);
    const sentenceToCompileClone = Array.from(sentenceToCompile);
    sentenceToCompileClone.splice(sentenceToCompileClone.indexOf(word), 1);
    compilledSentenceClone.push(word);
    setSentenceToCompille(sentenceToCompileClone);
    setCompilledSentence(compilledSentenceClone);
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

  const doVoice = () => {
    if (prompts.hasVoice) {
      setPrompts({
        ...prompts,
        showVoice: true,
        hasVoice: false
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
      <div className="puzzle_container" style={{ minWidth: getContentWidth(screenWidth) }}>
        <ScreenWidthContext.Provider value={screenWidth}>
          <PuzzleOptions
            doTranslate={doTranslate}
            doShowImage={doShowImage}
            doVoice={doVoice}
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
                moveToCompilled={moveToCompilled}
                showImage={prompts.showImage}
              />
            </DragDropContext>
            <PuzzleButtonToolbar
              puzzleIsCompilled={puzzleIsCompilled}
              sentenceIsCompilled={!sentenceToCompile.length}
              isChecked={isChecked}
              showResults={() => setNeedToShowResults(true)}
              dontKnow={dontKnow}
              checkCompilledSentence={checkCompilledSentence}
              doContinue={doContinue}
            />
            <PuzzleResultsModal
              modalIsOpen={needToShowResults}
              closeModal={() => setNeedToShowResults(false)}
              doContinue={doContinue}
              results={results}
            />
          </BackgroundContext.Provider>
        </ScreenWidthContext.Provider>
      </div>
    </div>
  )
}

export default Puzzle;