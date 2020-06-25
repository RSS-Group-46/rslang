import React from 'react';

import './Statistic.scss';

const Statistic = () => {
    return (
      <div className="statistic  container">
        <h3 className="statistic__title">Statistic</h3>
        <p className="statistic__text">
        указывается количество пройденных карточек со словами, процент
         правильных ответов, количество новых слов, самая длинная серия
          правильных ответов
      </p>
      <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Количество пройденных карточек со словами
                <span className="badge badge-primary badge-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Процент правильных ответов
                <span className="badge badge-primary badge-pill">2</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Количество новых слов
                <span className="badge badge-primary badge-pill">1</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Самая длинная серия правильных ответов
                <span className="badge badge-primary badge-pill">1</span>
            </li>
        </ul>
        <button type="button" className="btn btn-info statistic__button">Долгосрочная статистика</button>
      </div>
    );
  };
  
  export default Statistic;
