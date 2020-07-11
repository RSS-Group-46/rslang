import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MINI_GAMES_URL, PUZZLE_URL, PLAY_URL } from '../../constants/urlConstants';
import { getRandomImage } from './puzzleUtils';

const PuzzleWelcomePage = () => {
  const [goToGame, setGoToGame] = useState(false);
  if (goToGame) {
    return <Redirect to={MINI_GAMES_URL + PUZZLE_URL + PLAY_URL} />
  }
  return (
    <div style={{ backgroundImage: `url('${getRandomImage().url}')` }} className="welcome_background">
      <div className="welcome_overlay">
        <h1>ENGLISH PUZZLE</h1>
        <div className="overlay_description">
          Click on words, collect phrases. Words can be drag and drop. Select tooltips in menu
        </div>
        <button type="button" variant="dark" className="btn btn-success" onClick={() => setGoToGame(true)}>Start</button>
      </div>
    </div>
  )
}

export default PuzzleWelcomePage;