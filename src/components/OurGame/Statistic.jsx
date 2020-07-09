import React, { useEffect, useState } from 'react';
import { METHODS } from '../../constants/apiConstants';

const Statistic = ({ userId, token, level, round }) => {
  const [statistic, setStatistic] = useState();
  const [arrStatistic, setArrStatistic] = useState(null);
  useEffect(() => {
    fetch(
      `https://pacific-castle-12388.herokuapp.com/users/${userId}/statistics`,
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
        // eslint-disable-next-line no-unused-expressions
        data.optional && setArrStatistic(Object.values(data.optional.ourGame))
      });
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
              ourGame: {
                ...statistic.optional?.ourGame,
                [new Date().getTime()]: {
                  date: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
                  percentCorrectWords: `${3333}%`,
                  levelGame: level,
                  roundGame: round, 
                },
              },
            },
          }),
        },
      );
    }
  }, [statistic]);
  return (
    <div className="statistic__our-game">
      <div className="col-lg-4">
        <div className="bs-component">
          <div className="alert alert-dismissible alert-success">
            <span type="button" className="close" data-dismiss="alert">
              ×
            </span>
            <ul>
              <li>
                <span>date</span>
                <span>level</span>
                <span>round</span>
                <span>correct answers, %</span>
              </li>
              {arrStatistic && arrStatistic.map(({ date, percentCorrectWords, levelGame, roundGame }) => {
                return <li>
                  <span>{date}</span>
                  <span>{levelGame + 1}</span>
                  <span>{roundGame + 1}</span>
                  <span>{percentCorrectWords}</span>
                </li>
              })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
