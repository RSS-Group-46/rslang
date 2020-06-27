import React, { useState, useEffect} from 'react';

import './Statistic.scss';

const passedCards = 12;
const procentCorrectAnswers = 10;
const newWords = 4;
const longSeriesCorrectAnswers =20;
const none = 'none';
const show = 'statistic__section';


const Statistic = () => {

    const [shortStatistic, setShortStatisticClassName] = useState(show);
    const [longStatistic, setLongStatisticClassName] = useState(none);

    function showShortStatistic () {
        setShortStatisticClassName (show);
        setLongStatisticClassName (none);
    }

    function showLongStatistic () {
        setShortStatisticClassName(none);
        setLongStatisticClassName(show);
    }

    const canvasRef = React.useRef(null);
      useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');  
            if (context) {
                context.beginPath();
                context.arc(50, 50, 50, 0, 2 * Math.PI);
                context.moveTo(200, 200);
                context.lineTo(50, 50);
                context.lineTo(-30, 30);
                context.fill(); 
                context.fillStyle = "red"; 
                context.lineWidth = 4.0;
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(250, 0);
                context.lineTo(0, 200);
                context.lineTo(0, -350);
                context.lineTo(-200, 0);
                context.lineTo(-30, 30);
                context.stroke();
            }
    
        } 
    },[]);
    
    return (
      <div className="statistic  container">
        <h3 className="statistic__title">Statistic</h3>
        
      <section className={shortStatistic}>
                    <p className="statistic__text">
                        Краткосрочная статистика. Указывается количество пройденных карточек со словами, процент
                        правильных ответов, количество новых слов, самая длинная серия
                        правильных ответов
                    </p>
                    <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Количество пройденных карточек со словами
                        <span className="badge badge-primary badge-pill">{passedCards}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Процент правильных ответов
                        <span className="badge badge-primary badge-pill">{procentCorrectAnswers}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Количество новых слов
                        <span className="badge badge-primary badge-pill">{newWords}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Самая длинная серия правильных ответов
                        <span className="badge badge-primary badge-pill">{longSeriesCorrectAnswers}</span>
                    </li>
                </ul>
                <div className="statistic__button">
                    <button 
                        type="button" 
                        className="btn btn-info" 
                        onClick={() => showLongStatistic ()}
                        >Долгосрочная статистика</button>
                </div>
        </section>
        <section className={longStatistic}>
                <div className="statistic__button">
                    <button type="button" className="btn btn-info" 
                    onClick={() => showShortStatistic ()}
                   
                    >Краткосрочная статистика</button>
                </div>
                <p className="statistic__text">
                    Долгосрочная статистика - график, на котором отображается общее количество изученных 
                    слов за весь период.
                </p>
                <canvas ref={canvasRef} width={350} height={200} />

        </section>
      </div>
    );
  };
  
  export default Statistic;
