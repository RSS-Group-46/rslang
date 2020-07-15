import React from 'react';
import shortid from 'shortid';
import answerImg from '../../assets/icons/done.png';

import './SpeakItTrainAnswers.scss';

const SpeakItTrainAnswers = ({ words }) => {
  const marks = words.filter((word) => word.guessed);

  return (
    <div className="train-answers">
      {marks.map(() => (
        <img
          key={shortid.generate()}
          className="train-answers__img"
          src={answerImg}
          alt="answer"
        />
      ))}
    </div>
  );
};

export default SpeakItTrainAnswers;
