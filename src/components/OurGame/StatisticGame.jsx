import React from 'react';
import { NavLink } from 'react-router-dom';
import { MINI_GAMES_URL } from '../../constants/urlConstants';

const StatisticGame = ({ arrErrorAnswer, arrCorrectAnswer }) => {
  console.log(arrErrorAnswer);
  console.log(arrCorrectAnswer);
  const handleAudio = (audioSentece) => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${audioSentece}`,
    );
    audio.play();
  };
  
  return(
    <div className="statistic-round__our-game">
      <div className="col-lg-4">
        <div className="bs-component">
          <div className="alert alert-dismissible alert-success">
            <NavLink
              type="button"
              className="close"
              data-dismiss="alert"
              to={MINI_GAMES_URL}
            >
              ×
            </NavLink>
            <div>
              <h4>
                Errors: <span>{arrErrorAnswer.length}</span>
              </h4>
              {arrErrorAnswer.map((item) => (
                <div
                  className="table-danger"
                  role="presentation"
                  key={item.id}
                  onClick={() => handleAudio(item.audioExample)}
                >
                  <i className="fas fa-volume-up" />
                  <span>{item.textExample}</span>
                </div>
              ))}
            </div>
            <div>
              <h4>
                I know: <span>{arrCorrectAnswer.length}</span>
              </h4>
              {arrCorrectAnswer.map((item) => (
                <div
                  className="table-success"
                  role="presentation"
                  key={item.id}
                  onClick={() => handleAudio(item.audioExample)}
                >
                  <i className="fas fa-volume-up" />
                  <span>{item.textExample}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticGame;