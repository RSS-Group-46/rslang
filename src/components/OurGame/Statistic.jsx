import React, { useEffect, useState } from 'react';
import { METHODS } from '../../constants/apiConstants';

const Statistic = ({ userId, token }) => {
  const [statistic, setStatistic] = useState(null);
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
