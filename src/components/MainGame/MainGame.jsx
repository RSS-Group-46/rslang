import React  from 'react';
// import { useSelector, useDispatch } from 'react-redux';


import './MainGame.scss';




const MainGame = () => {
  const preSentence = 'The son';
  const word = 'aufschtehen';
  const afterSentence = 'in ost and zachodit in der west';
  const descriptionSentence = 'Солнце всходит на востоке и заходит на западе';
  const wordDescription = 'встаёт';

    return (
      <div className="maingame  container">
        <div className="container__wrap">
        <button type="button" className="btn btn-outline-secondary">&#60;</button>
          <div className="card bg-light mb-3" >
            <div className="card-header">
            <span className="badge badge-pill badge-success maingame__indicator"> </span>
            <span className="badge badge-pill badge-success maingame__indicator"> </span>
            <span className="badge badge-pill badge-success maingame__indicator"> </span>
            <span className="badge badge-pill badge-danger maingame__indicator"> </span>
            <span className="badge badge-pill badge-danger maingame__indicator"> </span>
            </div>
            <div className="card-body">
              <h4 className="card-title">
                {preSentence}
                  <span className="maingame__pasteWord">{word}</span> 
                  {afterSentence}
              </h4>
              <p className="card-text maingame__line">__________________________________</p>
              <p className="card-text maingame__button">{descriptionSentence}</p>
            </div>
          </div>
          <button type="button" className="btn btn-outline-secondary">&#62;</button>
        </div>
        <p className="text-info maingame__description">{wordDescription}</p>
      </div>
    );
  };
  
  export default MainGame;
