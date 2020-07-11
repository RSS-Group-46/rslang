import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MINI_GAMES_URL,
  SAVANNAH_URL,
  PLAY,
} from '../../../constants/urlConstants';

const SavannahWelcome = () => {
  return (
    <div className="container savannah__container">
      <h1>Welcome to Savannah mini-game</h1>
      <p>
        Саванна - это мини-игра, в которой задча игрока - выбрать правильный
        перевод слова, которое падает. На выбор дается 4 варианта ответа. Игра
        продолжается до тех пор, пока не кончатся слова либо пока не закончатся
        жизни. За каждый неправильный вариант ответа отнимается одна жизнь. В
        конце игры выводится статистика данной игры (количество правильных и
        неправильных ответов).
      </p>
      <NavLink
        className="btn btn-primary"
        type="button"
        to={MINI_GAMES_URL + SAVANNAH_URL + PLAY}
      >
        Play
      </NavLink>
    </div>
  );
};

export default SavannahWelcome;
