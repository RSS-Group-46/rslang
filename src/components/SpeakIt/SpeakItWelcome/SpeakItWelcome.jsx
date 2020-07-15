import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { MINI_GAMES_URL, SPEAKIT_URL } from '../../../constants/urlConstants';
import { PATH_SPEAKIT_TRAIN } from '../constants/speakItConstants';

import './SpeakItWelcome.scss';

const SpeakItWelcome = () => {
  const history = useHistory();

  const startHandler = () => {
    history.push(`${MINI_GAMES_URL}${SPEAKIT_URL}${PATH_SPEAKIT_TRAIN}`);
  };

  return (
    <div className="welcome">
      <div className="welcome__modal">
        <h1>Speakit</h1>
        <p>Click on the words to hear them sound.</p>
        <p>Click on the button and speak the words into the microphone.</p>
        <Button onClick={startHandler}>Start</Button>
      </div>
    </div>
  );
};

export default SpeakItWelcome;
