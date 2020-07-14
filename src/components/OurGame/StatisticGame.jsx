import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MINI_GAMES_URL } from '../../constants/urlConstants';
import { METHODS } from '../../constants/apiConstants';

const StatisticGame = ({
  arrErrorAnswer,
  arrCorrectAnswer,
  userId,
  token,
  offLoader,
}) => {
  const [statistic, setStatistic] = useState();
  const handleAudio = (audioSentece) => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${audioSentece}`,
    );
    audio.play();
  };

  useEffect(() => {
    fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
      {
        method: METHODS.GET,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setStatistic(data);
        offLoader();
      });
  }, []);

  useEffect(() => {
    if (statistic) {
      const date = new Date();
      fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
        {
          method: METHODS.PUT,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            learnedWords: arrCorrectAnswer.length + arrErrorAnswer.length,
            optional: {
              ...statistic.optional,
              miniGames: {
                ...(statistic.optional?.miniGames || {}),
                ourGame: [
                  ...(statistic.optional?.miniGames?.ourGame || []),
                  {
                    time: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
                    correct: arrCorrectAnswer.length,
                    wrong: arrErrorAnswer.length,
                  },
                ],
              },
            },
          }),
        },
      );
    }
  }, [statistic]);

  return (
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
                  <i className="fas fa-volume-up" key={`${item.id}1`} />
                  <span key={`${item.id}2`}>{item.textExample}</span>
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
  );
};

export default StatisticGame;
