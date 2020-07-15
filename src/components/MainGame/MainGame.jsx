/* eslint-disable no-underscore-dangle */

import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { BASE_URL } from '../../constants/urlConstants';
import { EVENT_TYPES } from '../../constants/actionTypeConstants';

import { saveStatistic } from '../../redux/actions/statistic.actions';
import {
  pushUserStatistic,
  pullUserStatistic,
  prepareStatisticForApp,
} from '../../services/statistic.service';

import Statistic from '../Statistic/Statistic';

import AssociationPicture from './components/AssociationPicture';
import TextExample from './components/TextExample';
import TextMeaning from './components/TextMeaning';
import Transcription from './components/Transcription';

import TextExampleTranslate from './components/TextExampleTranslate';
import TextMeaningTranslate from './components/TextMeaningTranslate';
import WordTranslate from './components/WordTranslate';
import Audio from './components/Audio';

import AuthContext from '../../contexts/auth.context';

import useUserAggregatedWords from '../../hooks/userAggregatedWords.hook';
import { selectSettings } from '../../redux/selectors/settings.selectors';
import useWord from '../../hooks/word.hook';
import { DIFFICULTY_DESCRIPTIONS } from '../../constants/settingsConstants';

import {
  getPlayData,
  getDataUrl,
  progressBarProcent,
} from './components/utils';

import './MainGame.scss';

const MainGame = () => {
  const { userId, token } = useContext(AuthContext);
  const userData = { userId, token };

  const settings = useSelector(selectSettings);

  const wordsPerRound = settings.wordsPerDay;

  const [image, setImage] = useState('');
  const [wordImput, setUserWord] = useState('');
  const [currentWordNum, setCurrentWord] = useState(0);
  const [isShowAnswear, setShowAnswear] = useState(false);

  const [countArrWord, setCountArrWord] = useState(0);
  const [loadedStatistic, setLoadedStatistic] = useState(0);

  const [correctResponse, setCorrectResponse] = useState(0);
  const [badResponse, setBadResponse] = useState(0);
  const [lineCorrectResponse, setLineCorrectResponse] = useState(0);
  const [maxLineCorrectResponse, setMaxLineCorrectResponse] = useState(0);

  const [isWordGuessed, setIsWordGuessed] = useState(false);

  const [succesClasseName, setSuccesClasseName] = useState('none');
  const [dangerClasseName, setDangerClasseName] = useState('none');

  const { createUserWord, deleteUserWord, updateUserWord } = useWord();

  const dispatch = useDispatch();
  function saveStatisticClick(gettingStatistic) {
    pushUserStatistic(gettingStatistic, userData);
    dispatch(saveStatistic(gettingStatistic));
  }

  function setStattisticNew() {
    const learnedWords = loadedStatistic.learnedWords + correctResponse;
    const passedCards = correctResponse;
    const procentCorrectAnswers = Math.round(
      (correctResponse / (correctResponse + badResponse)) * 100,
    );
    const newWords = correctResponse;
    const longSeriesCorrectAnswers = maxLineCorrectResponse;
    const currentPageFor = loadedStatistic.currentPageFor + 1;

    const gettingStatistic = {
      learnedWords,
      passedCards,
      procentCorrectAnswers,
      newWords,
      longSeriesCorrectAnswers,
      currentPageFor,
    };

    saveStatisticClick(gettingStatistic);
  }

  function deleteImputValue() {
    setUserWord('');
  }

  const childRef = useRef();

  const wordsConfig = {
    userId,
    token,
    group: Number(settings.difficulty),
    wordsPerPage: wordsPerRound,
    filter: {
      $or: [
        { page: loadedStatistic.currentPageFor },
        { page: loadedStatistic.currentPageFor + 1 },
      ],
    },
  };

  const { data } = useUserAggregatedWords(wordsConfig);
  const wordsRaw = (data && data[0].paginatedResults) || [];

  const wordObj = getPlayData(wordsRaw[countArrWord]);

  useEffect(() => {
    if (userData) {
      pullUserStatistic(userData).then((dataExp) => {
        if (dataExp) {
          setLoadedStatistic(prepareStatisticForApp(dataExp));
        }
      });
    }
  }, [isWordGuessed]);

  useEffect(() => {
    if (wordObj.image) {
      setImage(getDataUrl(wordObj.image));
    }
  }, [wordObj]);

  function showAnswear() {
    setShowAnswear(true);
  }

  function moveSuccesClasseName() {
    setSuccesClasseName('text-success');
  }

  function moveDangerClasseName() {
    setDangerClasseName('text-danger');
  }

  function removeSuccesClasseName() {
    setDangerClasseName('none');
  }

  function removeDangerClasseName() {
    setSuccesClasseName('none');
  }

  const [retfocus, setRetfocus] = useState(false);

  function returnfocus() {
    setRetfocus(!retfocus);
  }

  const [progressBarValue, setProgressBarValue] = useState(0);

  const moveToNextWord = () => {
    setCountArrWord(countArrWord + 1);
    deleteImputValue();
    setIsWordGuessed(false);
    setShowAnswear(false);
  };

  useEffect(() => {
    setProgressBarValue(progressBarProcent(currentWordNum, wordsRaw));
  }, [currentWordNum]);

  const [isShowStatistic, setShowStatistic] = useState(false);
  function enterAnswer() {
    if (
      currentWordNum >= wordsRaw.length &&
      succesClasseName === 'text-success'
    ) {
      setShowStatistic(true);
    }
    setProgressBarValue(progressBarProcent(currentWordNum, wordsRaw));
    removeDangerClasseName();
    removeSuccesClasseName();
    returnfocus();

    if (wordImput === wordObj.word && isWordGuessed) {
      moveToNextWord();
    }

    if (wordImput === wordObj.word && !isWordGuessed) {
      setCurrentWord(currentWordNum + 1);
      setLineCorrectResponse(lineCorrectResponse + 1);
      if (lineCorrectResponse >= maxLineCorrectResponse) {
        setMaxLineCorrectResponse(lineCorrectResponse + 1);
      }

      setCorrectResponse(correctResponse + 1);
      childRef.current.playAudio();
      setShowAnswear(true);
      setIsWordGuessed(true);
      createUserWord({
        userId,
        token,
        wordId: wordObj._id,
        word: {
          difficulty: DIFFICULTY_DESCRIPTIONS[wordObj.group],
          optional: {
            trash: false,
            difficult: false,
          },
        },
      });
      moveSuccesClasseName();
    }

    if (!(wordImput === wordObj.word) && !isWordGuessed) {
      setLineCorrectResponse(0);
      setBadResponse(badResponse + 1);
      childRef.current.playAudio();
      moveDangerClasseName();
    }
    if (currentWordNum >= wordsRaw.length) {
      setStattisticNew();
    }
  }

  const ariaValuenow = 50;
  const ariaValuemin = 0;
  const ariaValuemax = 100;

  const [key, setKey] = useState('');

  document.addEventListener('keydown', (e) => {
    if (e.key === EVENT_TYPES.Enter) {
      setKey(e.key);
    }
  });

  useEffect(() => {
    if (key === 'Enter') {
      enterAnswer();
    }
  }, [key]);

  const moveToDifficult = () => {
    updateUserWord({
      userId,
      token,
      wordId: wordObj._id,
      word: {
        optional: {
          difficult: true,
        },
      },
    });
  };

  const styleWidth = { width: `${progressBarValue}%` };
  return (
    <>
      <div className={!isShowStatistic ? 'maingame  container' : 'none'}>
        <p className="card-title maingame__translation">
          <span className="badge badge-pill badge-light">Learned -</span>
          <span className="badge badge-pill badge-success">
            {correctResponse}
          </span>
          <span className="badge badge-pill badge-light"> To learn - </span>
          <span className="badge badge-pill badge-info">{wordsRaw.length}</span>
        </p>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped bg-info"
            style={styleWidth}
            role="progressbar"
            aria-valuenow={ariaValuenow}
            aria-valuemin={ariaValuemin}
            aria-valuemax={ariaValuemax}
          >
            {' '}
          </div>
        </div>
        <div className="container__wrap">
          <button type="button" className="maingame__button">
            &#60;
          </button>
          <div className="card bg-light mb-3">
            <div className="card-header maingame__header">
              <AssociationPicture srcAssociationPicture={imageUrl()} />
            </div>
            <div className="card-body">
              <span className={succesClasseName}>Correct!</span>
              <span className={dangerClasseName}>Incorrect!</span>

              <h4 className="card-title">
                <TextExample
                  wordObj={wordObj}
                  isShowAnswear={isShowAnswear}
                  setUserWord={setUserWord}
                  wordImput={wordImput}
                  retfocus={retfocus}
                />
              </h4>
              <Transcription wordObj={wordObj} isShowAnswear={isShowAnswear} />
              <TextMeaning wordObj={wordObj} isShowAnswear={isShowAnswear} />
              <p className="card-text maingame__line">
                __________________________________
              </p>
              <TextExampleTranslate wordObj={wordObj} />
              <TextMeaningTranslate wordObj={wordObj} />
              <WordTranslate wordObj={wordObj} />
              <Audio wordObj={wordObj} ref={childRef} />
            </div>
          </div>
          <button
            type="button"
            className="maingame__button"
            onClick={() => enterAnswer()}
          >
            &#62;
          </button>
        </div>
        <div className="container__wrap">
          {settings.showAnswerButton && (
            <button
              type="button"
              className="btn btn-info"
              onClick={() => showAnswear()}
            >
              Reveal the answer
            </button>
          )}
          {settings.showDeleteButton && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() =>
                deleteUserWord({ userId, token, wordId: wordObj._id })
              }
            >
              Delete this word
            </button>
          )}
          {settings.showMoveToComplicatedButton && (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => moveToDifficult()}
            >
              Move to difficult
            </button>
          )}
          <button
            type="button"
            className="btn btn-success"
            onClick={() => enterAnswer()}
          >
            {succesClasseName === 'text-success' ? 'Next...' : 'Check!'}
          </button>
        </div>
      </div>
      <div className={isShowStatistic ? 'maingame  container' : 'none'}>
        <div>
          <Statistic />
        </div>
        <div className="d-flex flex-row justify-content-around">
          <Link className="btn btn-success" to={BASE_URL}>
            Proceed
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainGame;
