import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_GAME_URL } from '../../constants/urlConstants'  

import './MainGamePlay.scss'; 

export default () => {

  return (
    <div className="maingame  container">
      <p>
        <strong>Ход игры:</strong> Играйте и выигрывайте.<br />
      По мотивам игры Lingvist.<br />
      </p>
      <div className="d-flex flex-row justify-content-around">
        <Link className="btn btn-info" to={MAIN_GAME_URL}>Старт</Link>
      </div>
    </div>
  );
};
