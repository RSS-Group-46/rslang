/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { saveStatistic, loadStatistic, deleteStatistic } from '../../redux/actions/statistic.actions';
import { selectStatistic, selectPassedCards, selectProcentCorrectAnswers, selectNewWords, selectLongSeriesCorrectAnswers } from '../../redux/selectors/statistic.selectors';

import { USER_DATA_STORAGE_NAME } from '../../constants/commonConstants';
import { pushUserStatistic, pullUserStatistic, prepareStatisticForApp } from '../../services/statistic.service';

import { STATISTIC_INITIAL_STATE } from '../../constants/statisticConstants';
import { STATISTICS_URL, MINI_GAMES_URL } from '../../constants/urlConstants';

import './Statistic.scss';

import Graph from './Components/Graph';

/* ************ [Эти данные приходят после выполнения дневной нормы] ************* */
const learnedWords = 1739;
const passedCards = 12;
const procentCorrectAnswers = 10;
const newWords = 4;
const longSeriesCorrectAnswers =20;

const gettingStatistic = {
  learnedWords, passedCards, procentCorrectAnswers, newWords, longSeriesCorrectAnswers
}
/* ************ ************* */

const none = 'none';
const show = 'statistic__section';

let userData = localStorage.getItem(USER_DATA_STORAGE_NAME);
userData = JSON.parse(userData);


const getIsStatisticChanged = (settings) => JSON.stringify(settings) !== JSON.stringify(STATISTIC_INITIAL_STATE);

const Statistic = () => {
    const passedCardsNumber = useSelector(selectPassedCards);
    const procentCorrectAnswersNumber = useSelector(selectProcentCorrectAnswers);
    const newWordsNumber = useSelector(selectNewWords);
    const longSeriesCorrectAnswersNumber = useSelector(selectLongSeriesCorrectAnswers);
    let statistic = useSelector(selectStatistic);
    
    const dispatch = useDispatch();
/* ******** [ кнопка вспомогательная 
  выполнения дневной нормы должен сработать экшен saveStatistic и перезаписать статистику
так же надо предварительно пересчитать общее цисло выученых слов learnedWords!!! ] ******** */
  function saveStatisticClick () {
    statistic = gettingStatistic;
    dispatch(saveStatistic(statistic))
  }
/* ******** ******** */

  function deleteStatisticClick () {
    pushUserStatistic(STATISTIC_INITIAL_STATE, userData)
    dispatch(deleteStatistic(STATISTIC_INITIAL_STATE))
  }


  useEffect(() => {
    if (userData) {
      pullUserStatistic(userData)
        .then(data => {
          if (data) {
            const loadedStatistic = prepareStatisticForApp(data);
            dispatch(loadStatistic(loadedStatistic))
          }
        })
    }
  }, [userData, dispatch]);


  useEffect(() => {
    if (userData && getIsStatisticChanged(statistic)) {
      pushUserStatistic(statistic, userData)
    }
  }, [statistic, userData]);

    const [shortStatistic, setShortStatisticClassName] = useState(show);
    const [longStatistic, setLongStatisticClassName] = useState(none);
    const [goToMiniGamesStatistic, setGoToMiniGamesStatistic] = useState(false);

    function showShortStatistic () {
        setShortStatisticClassName (show);
        setLongStatisticClassName (none);
    }

    function showLongStatistic () {
        setShortStatisticClassName(none);
        setLongStatisticClassName(show);
    }

    if (goToMiniGamesStatistic) {
      return <Redirect to={STATISTICS_URL + MINI_GAMES_URL} />
    }

    return (
      <div className="statistic  container">
        <section className={shortStatistic}>
            <h5 className="statistic__title">Statistic</h5>
            <div className="statistic__button">
                <button 
                    type="button" 
                    className="btn btn-info" 
                    onClick={() => saveStatisticClick ()}
                >Сохранить статистику</button>
            </div>

            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Количество пройденных карточек со словами
                    <span className="badge badge-primary badge-pill">{passedCardsNumber}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Процент правильных ответов
                    <span className="badge badge-primary badge-pill">{procentCorrectAnswersNumber}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Количество новых слов
                    <span className="badge badge-primary badge-pill">{newWordsNumber}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Самая длинная серия правильных ответов
                    <span className="badge badge-primary badge-pill">{longSeriesCorrectAnswersNumber}</span>
                </li>
            </ul>
            <div className="statistic__button">
                <button 
                    type="button" 
                    className="btn btn-info" 
                    onClick={() => showLongStatistic ()}
                >Долгосрочная статистика</button>
                <button 
                    type="button" 
                    className="btn btn-info" 
                    onClick={() => setGoToMiniGamesStatistic(true)}
                >
                  Статистика мини-игр
                </button>
                <button
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => deleteStatisticClick ()}
                >Удалить статистику</button>
            </div>
        </section>
        <section className={longStatistic}>
            <Graph />
            <div className="statistic__button">
                <button type="button" 
                    className="btn btn-info" 
                    onClick={() => showShortStatistic ()}
                >Краткосрочная статистика</button>
                <button
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => deleteStatisticClick ()}
                >Удалить статистику</button>
            </div>
        </section>
      </div>
    );
  };
  
  export default Statistic;
