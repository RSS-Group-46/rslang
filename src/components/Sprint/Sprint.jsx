/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import Countdown from './Countdown';
import {
  selectShowAssociationPicture,
  selectShowTranscription,
  selectShowAnswerButton,
  selectShowDeleteButton,
  selectShowMoveToComplicatedButton,
} from '../../redux/selectors/settings.selectors';
import Stats from './Stats';
import ConsecutiveAnswers from './ConsecutiveAnswers';
import useUserAggregatedWords from '../../hooks/userAggregatedWords.hook';
import AuthContext from '../../contexts/auth.context';
import { getPlayData, correctWordUrls } from './Utils';
import { roundTime, wordsPerRound, scoreStep, consecutiveAnswersToBonus } from './Constants';

import './Sprint.scss';


export default () => {
  const [currentScore, setScore] = useState(0);
  const [consecutiveAnswers, setConsecutiveAnswers] = useState(0);
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [roundEnd, setRoundEnd] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const showAssociationPicture = useSelector(selectShowAssociationPicture);
  const showWordTranscription = useSelector(selectShowTranscription);
  const showAnswerButton = useSelector(selectShowAnswerButton);
  const showDeleteButton = useSelector(selectShowDeleteButton);
  const showMoveToComplicatedButton = useSelector(selectShowMoveToComplicatedButton);
  const { userId, token } = useContext(AuthContext);
  
  const wordsConfig = { userId, token, group: 0, wordsPerPage: wordsPerRound, filter: {} };
  const { data, error, loading: wordsLoading } = useUserAggregatedWords(wordsConfig);
  const wordsRaw = data && data[0].paginatedResults || [];
  const words = wordsRaw.map(correctWordUrls);
  const word = words[currentWord];
  const onTimeout = useCallback(() => setRoundEnd(true), []);
  const playData = getPlayData(word, words);

  const bonus = scoreStep * Math.floor(consecutiveAnswers / consecutiveAnswersToBonus);

  const handleAnswer = (answer) => {
    if (answer === playData.correct) {
      setScore((score) => score + scoreStep + bonus);
      setConsecutiveAnswers((c) => c + 1);
      setKnownWords((xs) => [...xs, word]);
    } else {
      setConsecutiveAnswers(0);
      setUnknownWords((xs) => [...xs, word]);
    }
    setCurrentWord((c) => c + 1);
  }


  return (
    <div className="container p-1">
      {!roundEnd && word && <div className="game">
        <div className="game__score">{`${currentScore}`}</div>
        <ConsecutiveAnswers current={consecutiveAnswers} total={consecutiveAnswersToBonus} />
        <div className="game__main card card-sprint border-primary mb-3">
          {showAssociationPicture && <img className="card-img-top word-image" src={playData.image} alt={playData.word} />}
          <div className="card-body">
            <div className="card-title d-flex justify-content-between">
              <h4>{playData.word}</h4>
              {showWordTranscription && <h3>{word.transcription}</h3>}
            </div>
            <h4 className="card-subtitle text-muted">{words.length > 0 ? playData.wordTranslate : 'none'}</h4>
          </div>
          <div className="card-footer">
            <div className="d-flex flex-row justify-content-between">
              <button className="btn btn-danger" type="button" onClick={() => handleAnswer(false)}>Не верно</button>
              <button className="btn btn-success" type="button" onClick={() => handleAnswer(true)}>Верно</button>
            </div>
          </div>
          {(showMoveToComplicatedButton || showAnswerButton || showDeleteButton) &&
            <div className="card-footer">
              <div className="d-flex flex-row justify-content-between">
                {showMoveToComplicatedButton && <button className="btn btn-warning" type="submit">Move to complicated</button>}
                {showAnswerButton && <button className="btn btn-info" type="submit">Reveal answer</button>}
                {showDeleteButton && <button className="btn btn-danger" type="submit">Delete word</button>}
              </div>
            </div>}
          {wordsLoading && <div className="card-img-overlay loader p-0">
            <h1>loading</h1>
          </div>}
        </div>
        <div className="game__countdown d-flex flex-column">
          <Countdown duration={roundTime} startImmediately onTimeout={onTimeout} />
        </div>
      </div>}
      {showStats && <Stats knownWords={knownWords} unknownWords={unknownWords} close={() => setShowStats(false)} />}
    </div>
  )
}