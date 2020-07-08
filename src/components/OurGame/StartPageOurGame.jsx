import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import OurGame from './OurGame';
import useAuth from '../../hooks/auth.hook';

import './OurGame.scss';

const roundOurGame = 'roundOurGame';
const levelOurGame = 'levelOurGame';

const StartPageOurGame = () => {
  const [loader, setLoader] = useState(false);
  const [start, setStart] = useState(false);
  const [sentence, setSentences] = useState(null);
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

  const handleBtnStartOurGame = () => setStart(true);

  const enableLoader = () => setLoader(true);
  const offLoader = () => setLoader(false);

  const handleLevel = (e) => {
    if (level !== +e.target.value - 1) {
      setLevel(+e.target.value - 1);
      localStorage.setItem(levelOurGame, +e.target.value - 1);
    }
  };

  const handleRound = (e) => {
    if (round !== +e.target.value - 1) {
      setRound(+e.target.value - 1);
      localStorage.setItem(roundOurGame, +e.target.value - 1);
    }
  };

  useEffect(() => {
    if (start) {
      setLoader(true);
      fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?page=${round}&group=${level}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setSentences(data);
        });
    }
  }, [start, level, round]);

  return (
    <div className="wrapper__our-game">
      {loader && <Loader />}
      {!sentence ? (
        <div className="wrapper__button-start">
          <h2>Collect the sentence.</h2>
          <button
            type="button"
            className="btn btn-info"
            onClick={handleBtnStartOurGame}
          >
            Start
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
        />
      )}
    </div>
  );
};

export default StartPageOurGame;
