import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all';
import ButtonLevel from './ButtonLevel';
import ButtonRound from './ButtonRound';
import Statistic from './Statistic';
import ListWord from './ListWord';
import BtnNextRepeat from './BtnNextRepeat';
import StatisticGame from './StatisticGame';
import { cleaningSentence } from './utils';
import { API_SIMILAR_WORDS } from './constants';
import { MINI_GAMES_URL } from '../../constants/urlConstants';

const OurGame = (props) => {
  const {
    sentence,
    handleLevel,
    handleRound,
    round,
    level,
    enableLoader,
    offLoader,
    userId,
    token,
  } = props;
  const [correctSentence, setCorrectSentence] = useState(null);
  const [similarWors, setSimilarWords] = useState(null);
  const [resultRound, setResultRound] = useState(false);
  const [numberWord, setNumberWord] = useState(0);
  const [selectWord, setSelectWord] = useState([]);
  const [statistic, setStatistic] = useState(false);
  const [numberWordRound, setNumberWordRound] = useState(0);
  const [statisticRound, setStatisticRound] = useState(false);
  const [arrCorrectAnswer, setArrCorrectAnswer] = useState([]);
  const [arrErrorAnswer, setArrErrorAnswer] = useState([]);
  let currentError = 0;

  const handleAudio = () => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${sentence[numberWordRound].audioExample}`,
    );
    audio.play();
  };

  const showResultRound = () => setResultRound(true);

  const handleWord = (e) => {
    // eslint-disable-next-line no-unused-expressions
    numberWord < similarWors.length - 1
      ? setNumberWord(numberWord + 1)
      : showResultRound();

    setSelectWord(selectWord.concat(e.target.textContent));
  };

  const handleRepeat = () => {
    setResultRound(false);
    setNumberWord(0);
    setSelectWord([]);
  };

  const handleNext = () => {
    if (numberWordRound < sentence.length - 1) {
      setResultRound(false);
      setNumberWord(0);
      setSelectWord([]);
      setNumberWordRound(numberWordRound + 1);

      selectWord.forEach((item) => {
        if (!correctSentence.includes(item)) {
          currentError += 1;
        }
      });
      // eslint-disable-next-line no-unused-expressions
      if (currentError > 0) {
        setArrErrorAnswer([...arrErrorAnswer, sentence[numberWordRound]]);
      } else {
        setArrCorrectAnswer([...arrCorrectAnswer, sentence[numberWordRound]]);
      }
    } else {
      setStatisticRound(true);
    }
  };

  const handleStatistic = () => {
    enableLoader();
    setStatistic(true);
  };
  const closeStatistic = () => {
    setStatistic(false);
  };

  useEffect(() => {
    if (sentence) {
      setCorrectSentence(cleaningSentence(sentence[numberWordRound]));
    }
  }, [sentence, numberWordRound]);

  useEffect(() => {
    if (correctSentence) {
      const arr = [];
      enableLoader();
      correctSentence.forEach((item, index) => {
        fetch(
          `https://api.wordassociations.net/associations/v1.0/json/search?apikey=${API_SIMILAR_WORDS}&text=${item}&lang=en&limit=5`,
        )
          .then((response) => response.json())
          .then((data) => {
            arr[index] = {
              similarWords: data.response[0].items,
              word: data.response[0].text,
            };
            return arr.filter((i) => i !== undefined);
          })
          .then((words) => {
            if (words.length === correctSentence.length) {
              offLoader();
              setSimilarWords(words);
            }
          });
      });
    }
  }, [correctSentence]);

  return (
    <div className="our-game">
      <div className="level-round__our-game">
        <div>
          <ButtonLevel handleLevel={handleLevel} level={level} />
          <ButtonRound handleRound={handleRound} round={round} />
          <button
            type="button"
            className="btn-statistic__our-game"
            onClick={handleStatistic}
          >
            Statistic
          </button>
        </div>
        {resultRound && (
          <NavLink
            type="button"
            className="close__our-game"
            data-dismiss="alert"
            to={MINI_GAMES_URL}
          >
            ×
          </NavLink>
        )}
      </div>
      {!resultRound && (
        <div
          className="audio__our-game"
          role="presentation"
          onClick={handleAudio}
        >
          <i className="fas fa-volume-up fa-7x" />
        </div>
      )}
      {similarWors && (
        <div className="list-word__our-game">
          <ListWord
            listSimilarWors={similarWors}
            correctSentence={correctSentence}
            showResultRound={showResultRound}
            resultRound={resultRound}
            handleWord={handleWord}
            numberWord={numberWord}
            selectWord={selectWord}
          />
        </div>
      )}
      {!resultRound ? (
        <div className="btn-listen__our-game">
          <button type="button" onClick={handleAudio}>
            LISTEN
          </button>
        </div>
      ) : (
        <BtnNextRepeat handleRepeat={handleRepeat} handleNext={handleNext} />
      )}
      {statistic && (
        <Statistic
          userId={userId}
          token={token}
          level={level}
          round={round}
          closeStatistic={closeStatistic}
          offLoader={offLoader}
        />
      )}
      {statisticRound && (
        <StatisticGame
          arrCorrectAnswer={arrCorrectAnswer}
          arrErrorAnswer={arrErrorAnswer}
        />
      )}
    </div>
  );
};

export default OurGame;
