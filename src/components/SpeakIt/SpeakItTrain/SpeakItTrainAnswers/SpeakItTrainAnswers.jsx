import React from 'react';
import answerImg from '../../assets/icons/done.png';

import './SpeakItTrainAnswers.scss';

const SpeakItTrainAnswers = () => {
  return (
    <div className="train-answers">
      <img className="train-answers__img" src={answerImg} alt="answer" />
    </div>
  );
};

export default SpeakItTrainAnswers;
