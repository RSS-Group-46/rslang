/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import useWords from '../../hooks/words.hook';

import './Sprint.scss';

const roundTime = 60;
const scoreStep = 10;
const consecutiveAnswersToBonus = 4;
const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getPlayData = (wordsArray, current) => {
  if (wordsArray[current] === undefined) return { word: null, wordTranslate: null, image: null };
  const correct = Math.random() >= 0.5;
  const { word, image } = wordsArray[current];
  let { wordTranslate } = wordsArray[current];

  if (!correct) {
    const currentExcluded = wordsArray.filter((w) => w.word !== word);
    wordTranslate = randomFromArray(currentExcluded).wordTranslate;
  }

  return { word, wordTranslate, image, correct };
}

export default () => {
  const [currentScore, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [consecutiveAnswers, setConsecutiveAnswers] = useState(0);
  const { wordsLoading, words, word, nextWords } = useWords();

  const playData = getPlayData(words, word);
  const bonus = scoreStep * Math.floor(consecutiveAnswers / consecutiveAnswersToBonus);

  const handleAnswer = (correct) => {
    if (correct === playData.correct) {
      setScore((score) => score + scoreStep);
      setCorrectAnswers((c) => c + 1);
      setConsecutiveAnswers((c) => c + 1);
    } else {
      setConsecutiveAnswers(0);
    }
    nextWords();
  }


  return (
    <div className="container p-5">
      {!wordsLoading && <>
        <div className="d-flex flex-row justify-content-between">
          <div className="score">{`Score: ${currentScore + bonus}`}</div>
          <div className="score">{`Correct answers: ${correctAnswers}`}</div>
        </div>
        <div className="card border-primary mb-3 w-50">
          {playData.image && <img className="card-img-top" src={playData.image} alt={playData.word} />}
          <div className="card-body">
            <h4 className="card-title">{words.length > 0 ? playData.word : 'none'}</h4>
            <h4 className="card-subtitle text-muted">{words.length > 0 ? playData.wordTranslate : 'none'}</h4>
          </div>
          <div className="card-footer">
            <div className="d-flex flex-row justify-content-between">
              <button className="btn btn-danger" type="button" onClick={() => handleAnswer(false)}>Не верно</button>
              <button className="btn btn-success" type="button" onClick={() => handleAnswer(true)}>Верно</button>
            </div>
          </div>
        </div>
        <Countdown timeout={roundTime} startImmediately />
      </>}
    </div>
  )
}