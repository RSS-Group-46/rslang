import React from 'react';
import { Link } from 'react-router-dom';
import { MINI_GAMES_URL } from '../../constants/urlConstants';


export default () => {

  return (
    <div className="game__main">
      <p>
        <strong>Ход игры:</strong> Вы видите слово на английском языке и перевод слова, нужно указать принадлежит ли данный перевод этому слову.
      Продолжительность раунда 1 минута.<br />
      В начале игры за каждое угаданное слово начисляется 10 баллов.<br />
      Каждые четыре правильных ответа подряд увеличивают количество баллов за каждое угаданное слово вдвое.<br />
      При ошибке за угаданное слово снова начисляется только 10 баллов.
      </p>
      <div className="d-flex flex-row justify-content-around">
        <Link className="btn btn-success" to="sprint/play">Играть</Link>
        <Link className="btn btn-info" to={MINI_GAMES_URL}>Другие игры</Link>
      </div>
    </div>
  );
};
