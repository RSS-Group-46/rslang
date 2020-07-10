import React from 'react';
import SpeechRecognition from 'react-speech-recognition';

import './SpeakItSpeechRecognition.scss';

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <button onClick={resetTranscript} type="button">
        Reset
      </button>
      <span>{transcript}</span>
    </div>
  );
};

export default SpeechRecognition(Dictaphone);
