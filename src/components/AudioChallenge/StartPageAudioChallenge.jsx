import React, { useState, useEffect } from 'react';
import AudioChallenge from './AudioChallenge';
import Loader from '../Loader/Loader';
import './AudioChallenge.scss';

const StartPageAudioChallenge = () => {
  const [start, setStart] = useState(false);
  const [loader, setLoader] = useState(false);
  const [words, setWords] = useState(null);
  
  const handleStartBtn = () => {
    setStart(true);
  };
  const offLoader = () => setLoader(false)
  useEffect (() => {
    if (start) {
      setLoader(true);
      fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=1&group=1`)
      .then((response) => response.json())
      .then((data) => {
        setWords(data);
      });
    }
  }, [start]);
  
  return (
    <div className="start-page__audio-challenge">
      {!words ? (
        <button
          type="button"
          className="badge badge-success"
          onClick={handleStartBtn}
        >
          Start
        </button>
      ) : (
        <AudioChallenge words={words} offLoader={offLoader}/>
      )}
      {loader && <Loader />}
    </div>
  );
};

export default StartPageAudioChallenge;
