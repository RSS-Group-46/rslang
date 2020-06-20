import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AudioChallenge from './AudioChallenge';
import Loader from '../Loader/Loader';
import './AudioChallenge.scss';
import { ONLY_USER_WORDS } from '../../constants/apiConstants';
import useAuth from '../../hooks/auth.hook';

const StartPageAudioChallenge = ({ settings }) => {
  const [start, setStart] = useState(false);
  const [loader, setLoader] = useState(false);
  const [words, setWords] = useState(null);
  const [level, setLevel] = useState(
    localStorage.getItem('levelAudioCall')
      ? JSON.parse(localStorage.getItem('levelAudioCall'))
      : '0',
  );
  const [round, setRound] = useState(
    localStorage.getItem('roundAudioCall')
      ? JSON.parse(localStorage.getItem('roundAudioCall'))
      : '0',
  );
  const [knowWords, setKnowWords] = useState(false);
  const [numberWord, setNumberWord] = useState(0);
  const { token, userId } = useAuth();
  const filter = {
    $or: [ONLY_USER_WORDS],
  };
  const group = 0;

  const handleStartBtn = () => {
    setStart(true);
  };
  const handleLevel = (e) => {
    if (level !== +e.target.value - 1) {
      setLevel(+e.target.value - 1);
      localStorage.setItem('levelAudioCall', +e.target.value - 1);
    }
    setKnowWords(false);
  };
  const handleRound = (e) => {
    if (round !== +e.target.value - 1) {
      setRound(+e.target.value - 1);
      localStorage.setItem('roundAudioCall', +e.target.value - 1);
    }
  };
  const handleOnlyLearnedWords = () => {
    setWords(false);
    setKnowWords(true);
    setNumberWord(0);
    setLoader(true);
  };

  const changeNumberWord = () => {
    setNumberWord(numberWord < words.length - 1 ? numberWord + 1 : numberWord);
  } 

  const offLoader = () => setLoader(false);

  useEffect(() => {
    if (start && !knowWords) {   
      setLoader(true);
      fetch(
        `https://pacific-castle-12388.herokuapp.com/words?page=${round}&group=${level}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setWords(data);
        });
    }
    if (knowWords) {
      const filterEncoded = encodeURIComponent(JSON.stringify(filter));
      const paramsStr = `group=${group}&wordsPerPage=${settings.wordsPerDay}&filter=${filterEncoded}`;
      fetch(
        `https://pacific-castle-12388.herokuapp.com/users/${userId}/aggregatedWords?${paramsStr}`,
        {
          method: 'GET',
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
  }, [start, level, knowWords, round]);

  return (
    <div className="start-page__audio-challenge">
      {!words ? (
        <>
          <h2>AUDIOCALL</h2>
          <p>Choose the correct answer.</p>
          <button
            rol="tab"
            type="button"
            className="badge badge-success"
            onClick={handleStartBtn}
          >
            Start
          </button>
        </>
      ) : (
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
        />
      )}
      {loader && <Loader />}
    </div>
  );
};
const mapStateToProps = ({ settings }) => ({
  settings,
});
export default connect(mapStateToProps)(StartPageAudioChallenge);
