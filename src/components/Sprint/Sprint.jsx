import React, { useState, useCallback, useContext } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import useUserAggregatedWords from '../../hooks/userAggregatedWords.hook';
import AuthContext from '../../contexts/auth.context';
import Countdown from './Countdown';
import Stats from './Stats';
import StartPage from './StartPage';
import PlayCard from './PlayCard';
import { getPlayData, correctWordUrls } from './utils';
import { roundTime, wordsPerRound, scoreStep, streakToBonus, PLAY_PATH, ROUND_END_PATH, ROOT_PATH } from './constants';

import './Sprint.scss';

export default () => {
  const [currentScore, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup] = useState(0);
  const [roundEnd, setRoundEnd] = useState(false);

  const history = useHistory();

  const { userId, token } = useContext(AuthContext);

  const endRound = useCallback(() => {
    setRoundEnd(true);
    history.push(ROUND_END_PATH);
  }, [history]);

  const resetStates = useCallback(() => {
    setScore(0);
    setStreak(0);
    setKnownWords([]);
    setUnknownWords([]);
    setCurrentWord(0);
    setRoundEnd(false);
  }, []);

  const bonus = scoreStep * Math.floor(streak / streakToBonus);

  const wordsConfig = {
    userId,
    token,
    group: currentGroup,
    page: currentPage,
    wordsPerPage: wordsPerRound,
    filter: { "$or": [{ "page": currentPage }, { "page": currentPage + 1 }] },
  };

  const { data, error: wordsLoadError, loading: wordsLoading } = useUserAggregatedWords(wordsConfig);

  const wordsRaw = data && data[0].paginatedResults || [];
  const words = wordsRaw.map(correctWordUrls);
  const playData = getPlayData(words[currentWord], words);

  const handleAnswer = useCallback((answer) => {
    if (answer === playData.correct) {
      setScore((score) => score + scoreStep + bonus);
      setStreak((c) => c + 1);
      setKnownWords((xs) => [...xs, playData.raw]);
    } else {
      setStreak(0);
      setUnknownWords((xs) => [...xs, playData.raw]);
    }
    setCurrentWord((c) => c + 1);
    if (currentWord + 1 === words.length) {
      endRound();
    }
  }, [playData, bonus, currentWord, words, endRound]);

  const restart = useCallback(() => {
    resetStates();
    history.push(PLAY_PATH);
  }, [resetStates, history]);

  const nextPage = useCallback(() => {
    resetStates();
    setCurrentPage((c) => c + 1);
    history.push(PLAY_PATH);
  }, [resetStates, history]);

  return (
    <div className="container ml-5">
      <div className="game">
        <Switch>
          <Route path={PLAY_PATH}>
            <div className="game__title">{currentScore}</div>
            {playData && !roundEnd &&
              <PlayCard
                wordsLoading={wordsLoading}
                playData={playData}
                handleAnswer={handleAnswer}
                streak={streak} maxStreak={streakToBonus}
              />}
            {!roundEnd && !wordsLoadError && !wordsLoading &&
              <div className="game__countdown d-flex flex-column">
                <Countdown duration={roundTime} startImmediately onTimeout={endRound} />
              </div>}
          </Route>
          <Route path={ROUND_END_PATH}>
            <Stats knownWords={knownWords} unknownWords={unknownWords} />
            <div className="game__footer d-flex flex-row justify-content-between">
              <button className="btn btn-info" type="button" onClick={restart}>Replay</button>
              <button className="btn btn-success" type="button" onClick={nextPage}>Next</button>
            </div>
            {!roundEnd && <Redirect to={ROOT_PATH} />}
          </Route>
          <Route>
            <StartPage />
          </Route>
        </Switch>
      </div>
    </div >
  )
};
