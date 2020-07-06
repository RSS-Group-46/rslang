/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const StatisticDetaile = ({
  handleStatisticDetaile,
  showStatisticDetaile,
  token,
  userId,
}) => {
  const [loader, setLoader] = useState(false);
  const [statistic, setStattistic] = useState(null);
  useEffect(() => {
    if (showStatisticDetaile) {
      setLoader(true);
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
        .then((data) => {
          setLoader(false);
          // eslint-disable-next-line no-unused-expressions
          data.optional && setStattistic(Object.values(data.optional));
        });
    }
  }, [showStatisticDetaile]);
  return (
    <>
      {loader && <Loader />}
      <div
        type="button"
        className="btn__statistic"
        onClick={handleStatisticDetaile}
      >
        Statistic
      </div>
      {showStatisticDetaile && (
        <div className="statistic__detaile">
          <div>
          <span onClick={handleStatisticDetaile}>X</span>
            <ul>
              <li>GAME TIME</li>
              <li>CORRECT ANSWERS</li>
              <li>LEVEL</li>
              <li>ROUND</li>
            </ul>

            {statistic &&
              statistic.map(({ date, percentCorrectWords, level, round }) => {
                return (
                  <ul key={date}>
                    <li key={date}>{date}</li>
                    <li key={date}>{percentCorrectWords}</li>
                    <li key={date}>{level}</li>
                    <li key={date}>{round}</li>
                  </ul>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
export default StatisticDetaile;
