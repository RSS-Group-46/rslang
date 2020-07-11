/* eslint-disable prefer-destructuring */
/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../contexts/auth.context';

const GameOver = ({ correct, wrong }) => {
  const sum = correct + wrong;
  const correctPercents = Math.floor((correct / sum) * 100);
  const wrongPercents = 100 - correctPercents;
  const [statistics, setStatistics] = useState({});
  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    try {
      fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
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
          setStatistics(data);
        });
    } catch (e) {
      //  TODO: add toast norification
    }
    // eslint-disable-next-line
  }, [setStatistics]);

  useEffect(() => {
    const { optional } = statistics;
    const date = new Date();
    const time = date.toLocaleString();
    delete statistics.id;
    if (optional) {
      const { miniGames } = optional;

      if (miniGames) {
        const { savannah } = miniGames;
        const lastGame = { time, correct, wrong };
        savannah.push(lastGame);
        statistics.optional.miniGames.savannah = savannah;
      } else {
        const savannah = [];
        const lastGame = { time, correct, wrong };
        savannah.push(lastGame);
        statistics.optional.miniGames.savannah = savannah;
      }
    } else {
      setStatistics({
        learnedWords: 0,
        optional: {
          miniGames: {
            savannah: [],
          },
        },
      });
    }
    // eslint-disable-next-line
  }, [statistics]);

  useEffect(() => {
    fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
      {
        method: 'PUT',
        body: JSON.stringify(statistics),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );
    // eslint-disable-next-line
  }, [statistics]);

  return (
    <div className="container savannah__container savannah-gameover">
      <h1>
        Game Over{' '}
        {correct > wrong ? (
          <FontAwesomeIcon icon={faSmile} />
        ) : (
          <FontAwesomeIcon icon={faFrown} />
        )}
      </h1>
      <div className="stats">
        <h2>Stats:</h2>
        <p>
          Correct: {correctPercents} % ({correct})
        </p>
        <p>
          Wrong: {wrongPercents} % ({wrong})
        </p>
      </div>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Play again
      </button>
      <NavLink className="btn btn-primary" to="/">
        Back to home page
      </NavLink>
    </div>
  );
};

export default GameOver;
