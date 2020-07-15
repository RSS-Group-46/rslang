/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import audioIcon from '../../assets/icons/audio.svg';

import './Stats.scss';

const wordObjToElement = (keyPrefix, obj, play) => (
  <div className="word-container" key={`${keyPrefix}-${obj._id}`}>
    <button
      className="btn"
      src={audioIcon}
      type="button"
      onClick={() => play(obj.audio)}
    >
      <img className="play-word-icon" src={audioIcon} alt="play audio for the word" />
    </button>
    <span className="word">{obj.word}</span>
    <span className="translation">{obj.wordTranslate}</span>
    <span>{obj.id}</span>
  </div>
);

export default ({ knownWords, unknownWords }) => {

  const playWord = useCallback((src) => {
    const audio = new Audio(src);
    audio.play();
  }, []);

  return (
    <div className="game__main card card-sprint border-primary mb-3">
      <div className="card-body">
        <div className="card-footer known-words">
          <h4>{`Знаю: ${knownWords.length}`}</h4>
          {knownWords && knownWords.map((w) => wordObjToElement('known', w, playWord))}
        </div>
        <div className="card-footer unknown-words">
          <h4>{`Не знаю: ${unknownWords.length}`}</h4>
          {unknownWords && unknownWords.map((w) => wordObjToElement('unknown', w, playWord))}
        </div>
      </div>
    </div>
  );
};
