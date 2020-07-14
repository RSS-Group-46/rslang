/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AudioChallenge from './AudioChallenge';
import TestEnglish from './TestEnglish';
import Loader from '../Loader/Loader';
import './AudioChallenge.scss';
import { ONLY_USER_WORDS, METHODS } from '../../constants/apiConstants';
import useAuth from '../../hooks/auth.hook';

const StartPageAudioChallenge = ({ settings }) => {
  const [start, setStart] = useState(false);
  const [loader, setLoader] = useState(false);
  const [words, setWords] = useState(null);
  const [startTest, setStartTest] = useState(false);
  const roundAudioCall = 'roundAudioCall';
  const levelAudioCall = 'levelAudioCall';
  const [level, setLevel] = useState(
    localStorage.getItem(levelAudioCall)
      ? JSON.parse(localStorage.getItem(levelAudioCall))
      : 0,
  );
  const [round, setRound] = useState(
    localStorage.getItem(roundAudioCall)
      ? JSON.parse(localStorage.getItem(roundAudioCall))
      : 0,
  );
  const [knowWords, setKnowWords] = useState(true);
  const [numberWord, setNumberWord] = useState(0);
  const { token, userId } = useAuth();
  const filter = {
    $or: [ONLY_USER_WORDS],
  };
  const group = 0;

  const handleStartBtn = () => {
    setStart(true);
  };
  const handleStartTest = () => {
    setStartTest(true);
  };
  const handleLevel = (e) => {
    if (level !== +e.target.value - 1) {
      setLevel(+e.target.value - 1);
      localStorage.setItem(levelAudioCall, +e.target.value - 1);
    }
    setKnowWords(false);
  };
  const handleRound = (e) => {
    if (round !== +e.target.value - 1) {
      setRound(+e.target.value - 1);
      localStorage.setItem(roundAudioCall, +e.target.value - 1);
    }
  };
  const handleOnlyLearnedWords = () => {
    setKnowWords(true);
    setNumberWord(0);
  };

  const changeNumberWord = () => {
    setNumberWord(numberWord < words.length - 1 ? numberWord + 1 : numberWord);
  };

  const offLoader = () => setLoader(false);

  useEffect(() => {
    if (start && !knowWords) {
      setLoader(true);
      fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?page=${round}&group=${level}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setWords(data);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, round, knowWords]);

  useEffect(() => {
    if (start && knowWords) {
      setLoader(true);
      const filterEncoded = encodeURIComponent(JSON.stringify(filter));
      const paramsStr = `group=${group}&wordsPerPage=${settings.wordsPerDay}&filter=${filterEncoded}`;
      fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?${paramsStr}`,
        {
          method: METHODS.GET,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data[0].paginatedResults.length >= settings.wordsPerDay) {
            data[0].paginatedResults.sort(() => Math.random() - 0.5);
            setWords(data[0].paginatedResults);
          } else {
            setKnowWords(false);
          }
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, knowWords]);

  return (
    <div className="start-page__audio-challenge">
      {!words && !startTest ? (
        <div className="wrapper__audio-challenge">
          <h2>AUDIOCALL</h2>
          <p>
            You can start the game or take a test to determine your English
            level
          </p>
          <div className="wrapper__btn-next">
            <button
              rol="tab"
              type="button"
              className="badge badge-success"
              onClick={handleStartBtn}
            >
              Start Game
            </button>
            <button
              rol="tab"
              type="button"
              className="badge badge-success"
              onClick={handleStartTest}
            >
              Start Test
            </button>
          </div>
        </div>
      ) : words && !startTest ? (
        <AudioChallenge
          words={words}
          offLoader={offLoader}
          handleLevel={handleLevel}
          level={level}
          handleOnlyLearnedWords={handleOnlyLearnedWords}
          handleRound={handleRound}
          round={round}
          changeNumberWord={changeNumberWord}
          numberWord={numberWord}
          settings={settings}
          knowWords={knowWords}
          token={token}
          userId={userId}
        />
      ) : (
        <TestEnglish />
      )}
      {loader && <Loader />}
    </div>
  );
};
const mapStateToProps = ({ settings }) => ({
  settings,
});
export default connect(mapStateToProps)(StartPageAudioChallenge);
