/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Countdown from './Countdown';
import useWords from '../../hooks/words.hook';

import './Sprint.scss';
import { selectShowAssociationPicture, selectShowTranscription, selectShowAnswerButton, selectShowDeleteButton, selectShowMoveToComplicatedButton } from '../../redux/selectors/settings.selectors';

const roundTime = 60;
const scoreStep = 10;
const consecutiveAnswersToBonus = 4;
const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default () => {
  const [currentScore, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [consecutiveAnswers, setConsecutiveAnswers] = useState(0);
  const [roundEnd, setRoundEnd] = useState(false);
  const showAssociationPicture = useSelector(selectShowAssociationPicture);
  const showWordTranscription = useSelector(selectShowTranscription);
  const showAnswerButton = useSelector(selectShowAnswerButton);
  const showDeleteButton = useSelector(selectShowDeleteButton);
  const showMoveToComplicatedButton = useSelector(selectShowMoveToComplicatedButton);
  const { wordsLoading, words, word, nextWords } = useWords();

  const onTimeout = useCallback(() => setRoundEnd(true), []);

  const getPlayData = useCallback(() => {
    if (words.length === 0) return { word: null, wordTranslate: null, image: null };
    const correct = Math.random() >= 0.5;
    const { image } = word;
    let { wordTranslate } = word;

    if (!correct) {
      const currentExcluded = words.filter((w) => w.word !== word);
      wordTranslate = randomFromArray(currentExcluded).wordTranslate;
    }

    return { word: word.word, wordTranslate, image, correct };
  }, [words, word]);

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
    <div className="container p-1">
      {word && <div className="game">
        <div className="game__score">{`Score: ${currentScore + bonus}`}</div>
        <div className="game__main card card-sprint border-primary mb-3">
          {showAssociationPicture && <img className="card-img-top word-image" src={playData.image} alt={playData.word} />}
          <div className="card-body">
            <div className="card-title d-flex justify-content-between">
              <h4>{playData.word}</h4>
              {showWordTranscription && <h3>{word.transcription}</h3>}
            </div>
            <h4 className="card-subtitle text-muted">{words.length > 0 ? playData.wordTranslate : 'none'}</h4>
          </div>
          <div className="card-footer">
            <div className="d-flex flex-row justify-content-between">
              <button className="btn btn-danger" type="button" onClick={() => handleAnswer(false)}>Не верно</button>
              <button className="btn btn-success" type="button" onClick={() => handleAnswer(true)}>Верно</button>
            </div>
          </div>
          {(showMoveToComplicatedButton || showAnswerButton || showDeleteButton) &&
            <div className="card-footer">
              <div className="d-flex flex-row justify-content-between">
                {showMoveToComplicatedButton && <button className="btn btn-warning" type="submit">Move to complicated</button>}
                {showAnswerButton && <button className="btn btn-info" type="submit">Reveal answer</button>}
                {showDeleteButton && <button className="btn btn-danger" type="submit">Delete word</button>}
              </div>
            </div>}
          {wordsLoading && <div className="card-img-overlay loader p-0">
            <h1>loading</h1>
          </div>}
        </div>
        <div className="game__countdown d-flex flex-column">
          <Countdown duration={roundTime} startImmediately onTimeout={onTimeout} />
        </div>
      </div>}
    </div>
  )
}