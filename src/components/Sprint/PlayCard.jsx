import React, { useCallback } from 'react';
import Streak from './Streak';

import audioIcon from '../../assets/icons/audio.svg';

export default ({ playData, wordsLoading, handleAnswer, streak, maxStreak }) => {
  const playCurrent = useCallback(() => {
    const audio = new Audio();
    audio.src = playData.raw.audio;
    audio.play();
  }, [playData]);

  return (
    <div className="game__main card card-sprint border-primary mb-3">
      <div className="card-body d-flex flex-column justify-content-between">
        {playData.raw &&
          <div className="card-title d-flex justify-content-between align-self-center">
            <h4>{playData.word}</h4>
          </div>}
        <Streak current={streak} max={maxStreak} />
        <h4 className="card-subtitle text-muted align-self-center">{playData.wordTranslate}</h4>
      </div>
      <div className="card-footer">
        <div className="d-flex flex-row justify-content-between">
          <button className="btn btn-danger" type="button" onClick={() => handleAnswer(false)}>Не верно</button>
          <button className="btn btn-info" type="button" onClick={playCurrent}><img className="play-icon" src={audioIcon} alt="play audio for the word" /></button>
          <button className="btn btn-success" type="button" onClick={() => handleAnswer(true)}>Верно</button>
        </div>
      </div>
      {wordsLoading &&
        <div className="card-img-overlay loader p-0">
          <h1>loading</h1>
        </div>}
    </div>
  );
};
