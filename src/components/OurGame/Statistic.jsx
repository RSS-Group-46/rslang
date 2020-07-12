import React, { useEffect, useState } from 'react';
import { METHODS } from '../../constants/apiConstants';

const Statistic = ({ userId, token, closeStatistic, offLoader}) => {
  const [arrStatistic, setArrStatistic] = useState(null);

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
        // eslint-disable-next-line no-unused-expressions
        data.optional && setArrStatistic(Object.values(data.optional.miniGames.ourGame));
        offLoader();
      });
  }, []);

  return (
    <div className="statistic__our-game" >
      <div className="col-lg-4">
        <div className="bs-component">
          <div className="alert alert-dismissible alert-success">
            <span
              type="button"
              className="close"
              data-dismiss="alert"
              role="presentation"
              onClick={closeStatistic}
            >
              ×
            </span>
            <ul>
              <li className='header__statistic'>
                <span>date</span>
                <span>wrong answers</span>
                <span>correct answers</span>
              </li>
              {arrStatistic &&
                arrStatistic.map(
                  ({ time, correct, wrong }, index) => {
                    return (
                      <li key={`${index.toString()}1`}>
                        <span key={`${index.toString()}2`}>{time}</span>
                        <span key={`${index.toString()}3`}>{wrong}</span>
                        <span key={`${index.toString()}4`}>{correct}</span>
                      </li>
                    );
                  },
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
