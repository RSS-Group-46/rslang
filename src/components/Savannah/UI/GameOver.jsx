/* eslint-disable */
/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../contexts/auth.context';
import { PLAY } from '../../../constants/urlConstants';

const GameOver = ({ correct, wrong, stats }) => {
  const sum = correct + wrong;
  const correctPercents = Math.floor((correct / sum) * 100);
  const wrongPercents = 100 - correctPercents;
  const [statistics, setStatistics] = useState({});
  const { token, userId } = useContext(AuthContext);

  // useEffect(() => {
  //   try {
  //     fetch(
  //       `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
  //       {
  //         method: 'GET',
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: 'application/json',
  //         },
  //       },
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setStatistics(data);
  //       });
  //   } catch (e) {
  //     //  TODO: add toast norification
  //   }
  // }, [statistics]);

  // useEffect(() => {
  //   const optional = statistics.optional;
  //   const date = new Date();
  //   const time = `${date.toLocaleString()}`;
  //   if (optional) {
  //     const allGames = optional.savannah.allGames;
  //     if (allGames.length === 29) {
  //       const allGames = [];
  //       const lastGame = { time, correct, wrong, stats };
  //       allGames.push(lastGame);
  //       statistics.optional.savannah = { allGames };
  //     } else {
  //       const lastGame = { time, correct, wrong, stats };
  //       allGames.push(lastGame);
  //       statistics.optional.savannah = { allGames };
  //     }
  //   }
  // }, [correct, wrong, stats, statistics]);

  // useEffect(() => {
  //   console.log(statistics);
  //   fetch(
  //     `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
  //     {
  //       method: 'PUT',
  //       body: JSON.stringify(statistics),
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //         Accept: 'application/json',
  //       },
  //     },
  //   );
  // }, [statistics]);

  return (
    <div className="container">
      <h1>
        Game Over{' '}
        {correct > wrong ? (
          <FontAwesomeIcon icon={faSmile} />
        ) : (
          <FontAwesomeIcon icon={faFrown} />
        )}
      </h1>
      <div className="stats">
        <h2>stats</h2>
        <p>
          {correctPercents} % ({correct})
        </p>
        <p>
          {wrongPercents} % ({wrong})
        </p>
      </div>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Play again
      </button>
      <NavLink className="btn btn-outline-primary" type="buttom" to="/">
        Back to home page
      </NavLink>
    </div>
  );
};

export default GameOver;
