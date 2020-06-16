import React, { useState } from 'react';
import Countdown from './Countdown';

import './Sprint.scss';

const scoreStep = 10;
const consecutiveAnswersToBonus = 4;

export default () => {
  const [currentScore, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [consecutiveAnswers, setConsecutiveAnswers] = useState(0);
  const translationCorrect = false;
  const bonus = scoreStep * Math.floor(consecutiveAnswers / consecutiveAnswersToBonus);

  const handleAnswer = (correct) => {
    if (correct === translationCorrect) {
      setScore((score) => score + scoreStep);
      setCorrectAnswers((c) => c + 1);
      setConsecutiveAnswers((c) => c + 1);
    } else {
      setConsecutiveAnswers(0);
    }
  }

  return (
    <div className="container p-5">
      <div className="d-flex flex-row justify-content-between">
        <div className="score">{`Score: ${currentScore + bonus}`}</div>
        <div className="score">{`Correct answers: ${correctAnswers}`}</div>
      </div>
      <div className="card border-success mb-3" >
        <div className="card-body">
          <h4 className="card-title">note</h4>
          <h4 className="card-subtitle text-muted">говорить шёпотом</h4>
        </div>
        <div className="card-footer">
          <div className="d-flex flex-row justify-content-between">
            <button className="btn btn-danger" type="button" onClick={() => handleAnswer(false)}>Не верно</button>
            <button className="btn btn-success" type="button" onClick={() => handleAnswer(true)}>Верно</button>
          </div>
        </div>
      </div>
      <Countdown timeout={60} startImmediately />
    </div>
  )
}