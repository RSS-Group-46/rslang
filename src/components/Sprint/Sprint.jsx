/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useContext, useEffect } from 'react';
import Countdown from './Countdown';

import useUserAggregatedWords from '../../hooks/userAggregatedWords.hook';
import AuthContext from '../../contexts/auth.context';

import ConsecutiveAnswers from './ConsecutiveAnswers';
import Stats from './Stats';
import PlayCard from './PlayCard';
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

  const { userId, token } = useContext(AuthContext);

  const onTimeout = useCallback(() => {setRoundEnd(true);setShowStats(true);}, []);
  const closeStats = useCallback(() => setShowStats(false), []);

  const bonus = scoreStep * Math.floor(consecutiveAnswers / consecutiveAnswersToBonus);

  const wordsConfig = { userId, token, group: 0, wordsPerPage: wordsPerRound, filter: {} };
  const { data, error: wordsLoadError, loading: wordsLoading } = useUserAggregatedWords(wordsConfig);

  const wordsRaw = data && data[0].paginatedResults || [];
  const words = wordsRaw.map(correctWordUrls);
  const playData = getPlayData(words[currentWord], words);


  const handleAnswer = useCallback((answer) => {
    if (answer === playData.correct) {
      setScore((score) => score + scoreStep + bonus);
      setConsecutiveAnswers((c) => c + 1);
      setKnownWords((xs) => [...xs, playData.raw]);
    } else {
      setConsecutiveAnswers(0);
      setUnknownWords((xs) => [...xs, playData.raw]);
    }
    setCurrentWord((c) => c + 1);
    if (currentWord + 1 === words.length) {
      setRoundEnd(true);
      setShowStats(true);
    }
  }, [playData, bonus, currentWord, words]);


  return (
    <div className="container p-1">
      <div className="game">
        <div className="game__score">{`${currentScore}`}</div>
        <ConsecutiveAnswers current={consecutiveAnswers} total={consecutiveAnswersToBonus} />
        {!wordsLoading && playData && !roundEnd &&
        <PlayCard wordsLoading={wordsLoading} playData={playData} handleAnswer={handleAnswer} />}
        <div className="game__countdown d-flex flex-column">
          {!roundEnd && !wordsLoadError && !wordsLoading && 
          <Countdown duration={roundTime} startImmediately onTimeout={onTimeout} />}
        </div>
      </div>
      {showStats && 
      <Stats score={currentScore} knownWords={knownWords} unknownWords={unknownWords} close={closeStats} />}
    </div>
  )
}