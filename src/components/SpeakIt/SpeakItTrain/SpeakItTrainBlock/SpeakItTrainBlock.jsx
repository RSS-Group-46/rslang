import React from 'react';
import Button from '../../UI/Button/Button';
import defaultTrainImg from '../../assets/images/train-img.jpg';

import './SpeakItTrainBlock.scss';

const SpeakItTrainBlock = () => {
  const wordItem = () => {
    // array words from API
    return (
      <>
        <li className="word-cards__card">
          <p className="word-cards__text">english</p>
          <p className="word-cards__transcription">[english]</p>
        </li>
        <li className="word-cards__card">
          <p className="word-cards__text">english</p>
          <p className="word-cards__transcription">[english]</p>
        </li>
        <li className="word-cards__card">
          <p className="word-cards__text">english</p>
          <p className="word-cards__transcription">[english]</p>
        </li>
        <li className="word-cards__card">
          <p className="word-cards__text">english</p>
          <p className="word-cards__transcription">[english]</p>
        </li>
        <li className="word-cards__card">
          <p className="word-cards__text">english</p>
          <p className="word-cards__transcription">[english]</p>
        </li>
      </>
    );
  };

  const classesRestart = 'train-buttons__restart';
  const classesSpeak = 'train-buttons__speak';
  const classesResult = 'train-buttons__results';

  return (
    <div className="train  container">
      <img className="train__img" src={`${defaultTrainImg}`} alt="train" />
      <div className="train-word">перевод</div>
      <ul className="word-cards">{wordItem()}</ul>
      <div className="train-buttons">
        <Button classes={classesRestart}>Restart</Button>
        <Button classes={classesSpeak}>Speak please</Button>
        <Button classes={classesResult}>Results</Button>
      </div>
    </div>
  );
};

export default SpeakItTrainBlock;
