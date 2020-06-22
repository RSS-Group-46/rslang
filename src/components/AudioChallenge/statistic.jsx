import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all';
import { MINI_GAMES_URL } from '../../constants/urlConstants';

const StatisticAudioChallenge = ({ arrCorrectAnswers, arrErrorAnswers }) => {
  const arrCorrectFilter = new Set(arrCorrectAnswers);
  const arrErrorsFilter = new Set(arrErrorAnswers);
  console.log(arrCorrectFilter);
  
  const handleAudio = (audios) => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${audios}`,
    );
    audio.play();
  };

  return (
    <div className="statistic__audio-challenge">
      <div className="col-lg-4">
        <div className="bs-component">
          <div className="alert alert-dismissible alert-success">
            <NavLink type="button" className="close" data-dismiss="alert" to={MINI_GAMES_URL}>
              ×
            </NavLink>
            <div>
              <h4>
                Errors: <span>{[...arrErrorsFilter].length}</span>
              </h4>
              {[...arrErrorsFilter].map((item) => (
                  <div
                    className="table-danger"
                    onClick={() => handleAudio(item.audio)}
                    role="presentation"
                    key={item.word}
                  >
                    <i className="fas fa-volume-up"/>
                    {item.word}
                  </div>
              ))}
            </div>
            <div>
              <h4>
                I know: <span>{[...arrCorrectFilter].length}</span>
              </h4>
              {[...arrCorrectFilter].map((item) => (
                <div
                  className="table-success"
                  onClick={() => handleAudio(item.audio)}
                  role="presentation"
                  key={item.word}
                >
                  <i className="fas fa-volume-up" />
                  {item.word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticAudioChallenge;
