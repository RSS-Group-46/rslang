import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/js/all';
import { MINI_GAMES_URL } from '../../constants/urlConstants';
import { METHODS } from '../../constants/apiConstants';

const StatisticAudioChallenge = ({
  arrCorrectAnswers,
  arrErrorAnswers,
  size,
  level,
  round,
  knowWords,
  token,
  userId,
}) => {
  const [statistic, setStatistic] = useState(null);
  const arrCorrectFilter = new Set(arrCorrectAnswers);
  const arrErrorsFilter = new Set(arrErrorAnswers);
  const handleAudio = (audios) => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${audios}`,
    );
    audio.play();
  };

  useEffect(() => {
    fetch(
      `https://pacific-castle-12388.herokuapp.com/users/${userId}/statistics`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => setStatistic(data));
  }, []);

  useEffect(() => {
    if (statistic) {
      const date = new Date();
      fetch(
        `https://pacific-castle-12388.herokuapp.com/users/${userId}/statistics`,
        {
          method: METHODS.PUT,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            learnedWords: 13,
            optional: {
              ...statistic.optional,
              audioCall: {
                ...statistic.optional?.audioCall,
                [new Date().getTime()]: {
                  date: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
                  percentCorrectWords: `${Math.round(
                    ([...arrCorrectFilter].length * 100) / size,
                  )}%`,
                  level: knowWords ? 'learned words' : `${level + 1}`,
                  round: knowWords ? 'learned words' : `${round + 1}`,
                },
              },
            },
          }),
        },
      );
    }
  }, [statistic]);

  return (
    <div className="statistic__audio-challenge">
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
                Errors: <span>{[...arrErrorsFilter].length}</span>
              </h4>
              {[...arrErrorsFilter].map((item) => (
                <div
                  className="table-danger"
                  onClick={() => handleAudio(item.audio)}
                  role="presentation"
                  key={item.word}
                >
                  <i className="fas fa-volume-up" />
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
