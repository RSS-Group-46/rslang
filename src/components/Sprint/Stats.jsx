import React from 'react';

import audioIcon from '../../assets/icons/audio.svg';

import './Stats.scss';

const wordObjToElement = (obj) => (
  <div className="word-container" key={obj.id}>
    <img className="play-word-icon" src={audioIcon} alt="play audio for the word" />
    <span className="word">{obj.word}</span>
    <span className="translation">{obj.wordTranslate}</span>
  </div>
);

export default ({ knownWords, unknownWords }) => {

  return (
    <div className="stats-modal">
      <div className="stats-modal__content shadow border-primary">
        <div className="known-words">
          <h4>{`Знаю: ${knownWords.length}`}</h4>
          {knownWords.map(wordObjToElement)}
        </div>
        <div className="unknown-words">
          <h4>{`Не знаю: ${unknownWords.length}`}</h4>
          {unknownWords.map(wordObjToElement)}
        </div>
      </div>
    </div>
  );
};
