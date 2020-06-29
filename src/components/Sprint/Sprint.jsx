/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useContext, useEffect } from 'react';
import Countdown from './Countdown';

import useUserAggregatedWords from '../../hooks/userAggregatedWords.hook';
import AuthContext from '../../contexts/auth.context';
import { withPage } from '../../constants/apiConstants';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [roundEnd, setRoundEnd] = useState(false);

  const { userId, token } = useContext(AuthContext);

  const onTimeout = useCallback(() => setRoundEnd(true), []);

  const resetStates = useCallback(() => {
    setScore(0);
    setConsecutiveAnswers(0);
    setKnownWords([]);
    setUnknownWords([]);
    setCurrentWord(0);
    setRoundEnd(false);
  }, []);

  const bonus = scoreStep * Math.floor(consecutiveAnswers / consecutiveAnswersToBonus);

  const wordsConfig = {
    userId,
    token,
    group: currentGroup,
    page: currentPage,
    wordsPerPage: wordsPerRound,
    filter: { ...withPage(currentPage) }
  };

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
    }
  }, [playData, bonus, currentWord, words]);

  const restart = useCallback(() => {
    resetStates();
  }, [resetStates]);

  const nextPage = useCallback(() => {
    resetStates();
    setCurrentPage((c) => c + 1);
  }, [resetStates]);


  return (
    <div className="container p-1">
      <div className="game">
        {!roundEnd &&
          <div className="game__score">{`${currentScore}`}</div>}
        {!roundEnd &&
          <ConsecutiveAnswers current={consecutiveAnswers} total={consecutiveAnswersToBonus} />}
        {!wordsLoading && playData && !roundEnd &&
          <PlayCard wordsLoading={wordsLoading} playData={playData} handleAnswer={handleAnswer} />}
        {!roundEnd && !wordsLoadError && !wordsLoading &&
          <div className="game__countdown d-flex flex-column">
            <Countdown duration={roundTime} startImmediately onTimeout={onTimeout} />
          </div>}
        {roundEnd &&
          <Stats score={currentScore} knownWords={knownWords} unknownWords={unknownWords} />}
        {roundEnd &&
          <div className="game__footer d-flex flex-row justify-content-between">
            <button className="btn btn-info" type="button" onClick={restart}>Replay</button>
            <button className="btn btn-success" type="button" onClick={nextPage}>Next</button>
          </div>}
      </div>
    </div>
  )
}