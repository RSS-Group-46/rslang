import React, { useState } from 'react';
import SpeakItTrainLevel from './SpeakItTrainLevel/SpeakItTrainLevel';
import SpeakItTrainAnswers from './SpeakItTrainAnswers/SpeakItTrainAnswers';
import SpeakItTrainBlock from './SpeakItTrainBlock/SpeakItTrainBlock';

const SpeakItTrain = () => {
  const [currentTrainLevel, setCurrentTrainLevel] = useState(1);
  const [words, setWords] = useState([]);

  return (
    <>
      <div className="train-page  container">
        <SpeakItTrainLevel
          currentTrainLevel={currentTrainLevel}
          setCurrentTrainLevel={setCurrentTrainLevel}
        />
        <SpeakItTrainBlock
          currentTrainLevel={currentTrainLevel}
          words={words}
          setWords={setWords}
        />
      </div>
      <SpeakItTrainAnswers words={words} />
    </>
  );
};

export default SpeakItTrain;
