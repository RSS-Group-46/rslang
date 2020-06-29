/* eslint-disable no-underscore-dangle */
import React from 'react';

import audioIcon from '../../assets/icons/audio.svg';

import './Stats.scss';

const wordObjToElement = (keyPrefix, obj) => (
  <div className="word-container" key={`${keyPrefix}-${obj._id}`}>
    <img className="play-word-icon" src={audioIcon} alt="play audio for the word" />
    <span className="word">{obj.word}</span>
    <span className="translation">{obj.wordTranslate}</span>
    <span>{obj.id}</span>
  </div>
);

export default ({ knownWords, unknownWords }) => {

  return (
    <div className="game__main card card-sprint border-primary mb-3">
      <div className="card-body">
        <div className="card-footer known-words">
          <h4>{`Знаю: ${knownWords.length}`}</h4>
          {knownWords && knownWords.map((w) => wordObjToElement('known', w))}
        </div>
        <div className="card-footer unknown-words">
          <h4>{`Не знаю: ${unknownWords.length}`}</h4>
          {unknownWords && unknownWords.map((w) => wordObjToElement('unknown', w))}
        </div>
      </div>
    </div>
  );
};
