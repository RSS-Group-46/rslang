import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/js/all';
import ButtonLevel from './ButtonLevel';
import ButtonRound from './ButtonRound';
import ListWord from './ListWord';
import { cleaningSentence } from './utils';
import { API_SIMILAR_WORDS } from './constants';

const OurGame = (props) => {
  const {
    sentence,
    handleLevel,
    handleRound,
    round,
    level,
    enableLoader,
    offLoader,
  } = props;
  const [correctSentence, setCorrectSentence] = useState(null);
  const [similarWors, setSimilarWords] = useState(null);
  const [resultRound, setResultRound] = useState(false);

  const handleAudio = () => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${sentence[0].audioExample}`,
    );
    audio.play();
  };

  const showResultRound = () => setResultRound(true);

  useEffect(() => {
    if (sentence) {
      setCorrectSentence(cleaningSentence(sentence[0]));
    }
  }, [sentence]);

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
        <ButtonLevel handleLevel={handleLevel} level={level} />
        <ButtonRound handleRound={handleRound} round={round} />
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
          />
        </div>
      )}
      {!resultRound && (
        <div className="btn-listen__our-game">
          <button type="button" onClick={handleAudio}>
            LISTEN
          </button>
        </div>
      )}
    </div>
  );
};

export default OurGame;
