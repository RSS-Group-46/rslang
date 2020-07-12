import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import OurGame from './OurGame';
import useAuth from '../../hooks/auth.hook';
import { METHODS, ONLY_USER_WORDS } from '../../constants/apiConstants';

import './OurGame.scss';

const roundOurGame = 'roundOurGame';
const levelOurGame = 'levelOurGame';

const StartPageOurGame = ({ settings }) => {
  const [loader, setLoader] = useState(false);
  const [start, setStart] = useState(false);
  const [sentence, setSentences] = useState(null);
  const [learnedWords, setLearnedWords] = useState(true);
  const [level, setLevel] = useState(
    localStorage.getItem(levelOurGame)
      ? JSON.parse(localStorage.getItem(levelOurGame))
      : 0,
  );
  const [round, setRound] = useState(
    localStorage.getItem(roundOurGame)
      ? JSON.parse(localStorage.getItem(roundOurGame))
      : 0,
  );
  const { token, userId } = useAuth();
  const filter = {
    $or: [ONLY_USER_WORDS],
  };

  const handleBtnStartOurGame = () => setStart(true);

  const enableLoader = () => setLoader(true);
  const offLoader = () => setLoader(false);

  const handleLevel = (e) => {
    if (level !== e.target.value - 1) {
      setLevel(e.target.value - 1);
      localStorage.setItem(levelOurGame, e.target.value - 1);
    }
  };

  const handleRound = (e) => {
    if (round !== e.target.value - 1) {
      setRound(e.target.value - 1);
      localStorage.setItem(roundOurGame, e.target.value - 1);
    }
  };

  const handleLearnedWords = (e) => {
    setLearnedWords(e.target.checked);
  }

  useEffect(() => {
    if (!learnedWords) {
      setLoader(true);
      fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?page=${round}&group=${level}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setSentences(data);
        });
    }
  }, [start, level, round, learnedWords]);

  useEffect(() => {
    if (start && learnedWords) {
      setLoader(true);
      const filterEncoded = encodeURIComponent(JSON.stringify(filter));
      const paramsStr = `group=0&wordsPerPage=${settings.wordsPerDay}&filter=${filterEncoded}`;
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
            setSentences(data[0].paginatedResults);
            setLoader(false)
          } else {
            setLearnedWords(false);
          }
        });
    }
  }, [start, learnedWords]);

  return (
    <div className="wrapper__our-game">
      {loader && <Loader />}
      {!sentence ? (
        <div className="wrapper__button-start">
          <h2>OUR GAME</h2>
          <h3>Collect the sentence.</h3>
          <button
            type="button"
            onClick={handleBtnStartOurGame}
          >
            START
          </button>
        </div>
      ) : (
        <OurGame
          sentence={sentence}
          handleLevel={handleLevel}
          handleRound={handleRound}
          level={level}
          round={round}
          enableLoader={enableLoader}
          offLoader={offLoader}
          token={token}
          userId={userId}
          handleLearnedWords={handleLearnedWords}
          learnedWords={learnedWords}
          showTranslation={settings.showTranslation}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(StartPageOurGame);
