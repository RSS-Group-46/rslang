import React from 'react';
import shortid from 'shortid';
import closeImg from '../assets/icons/close.png';

import './SpeakItStatistics.scss';

const SpeakItStatistics = ({ words, setStatistics }) => {
  const unGuessed = words.filter((word) => word.guessed !== true);
  const guessed = words.filter((word) => word.guessed === true);

  return (
    <div className="statistics">
      <img
        src={closeImg}
        alt="close"
        onClick={() => setStatistics(false)}
        role="presentation"
      />
      <div className="statistics-body">
        <h3 className="statistic-title">Mistakes</h3>
        <ul className="statistic-list">
          {unGuessed.map((word) => {
            return (
              <li key={shortid.generate()} className="statistics-item">
                <span className="statistics-item--eng">{word.word}</span>
                <span className="statistics-item--transcription">
                  {word.transcription}
                </span>
                <span className="statistics-item--translate">
                  {word.wordTranslate}
                </span>
              </li>
            );
          })}
        </ul>
        <h3 className="statistic-title">Success</h3>
        <ul className="statistic-list">
          {guessed.map((word) => {
            return (
              <li key={shortid.generate()} className="statistics-item">
                <span className="statistics-item--eng">{word.word}</span>
                <span className="statistics-item--transcription">
                  {word.transcription}
                </span>
                <span className="statistics-item--translate">
                  {word.wordTranslate}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SpeakItStatistics;
