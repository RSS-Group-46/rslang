import React from 'react';
// import { useSelector } from 'react-redux';

// import { selectShowAssociationPicture } from '../../redux/selectors/settings.selectors';

import AssociationPicture from './components/AssociationPicture';
import TextExample from './components/TextExample';
import TextMeaning from './components/TextMeaning';
import Transcription from './components/Transcription';

import TextExampleTranslate from './components/TextExampleTranslate';
import TextMeaningTranslate from './components/TextMeaningTranslate';
import WordTranslate from './components/WordTranslate';


import './MainGame.scss';
import image from './img/sun.jpg'

const wordJSONfromBack = 
      `{
        "_id": "5e9f5ee35eb9e72bc21af4a0",
        "group": 0,
        "page": 0,
        "word": "alcohol",
        "image": "files/01_0002.jpg",
        "audio": "files/01_0002.mp3",
        "audioMeaning": "files/01_0002_meaning.mp3",
        "audioExample": "files/01_0002_example.mp3",
        "textMeaning": "<i>Alcohol</i> is a type of drink that can make people drunk.",
        "textExample": "A person should not drive a car after he or she has been drinking <b>alcohol</b>.",
        "transcription": "[ǽlkəhɔ̀ːl]",
        "textExampleTranslate": "Человек не должен водить машину после того, как он выпил алкоголь",
        "textMeaningTranslate": "Алкоголь - это тип напитка, который может сделать людей пьяными",
        "wordTranslate": "алкоголь",
        "wordsPerExampleSentence": 15,
        "userWord": {
          "difficulty": "strong"
        }
      }`

  const wordObj = JSON.parse(wordJSONfromBack)
  

const MainGame = () => {
  let  isShowAnswear = false;

  function showAnswear () {
    isShowAnswear = true;
  }

    return (
      <div className="maingame  container">
        <div className="container__wrap">
          <button type="button" className="maingame__button">&#60;</button>
          <div className="card bg-light mb-3" >
            <div className="card-header maingame__header">
              <AssociationPicture srcAssociationPicture={image} />
            </div>
            <div className="card-body">
                <h4 className="card-title">
                  <TextExample wordObj={wordObj} isShowAnswear={isShowAnswear}/>
                </h4>
                <Transcription wordObj={wordObj}/>
                <TextMeaning wordObj={wordObj} isShowAnswear={isShowAnswear}/>
                <p className="card-text maingame__line">__________________________________</p>
                <TextExampleTranslate wordObj={wordObj}/>
                <TextMeaningTranslate wordObj={wordObj}/>
                <WordTranslate wordObj={wordObj}/>
            </div>
          </div>
          <button type="button" className="maingame__button">&#62;</button>
        </div>
        <button type="button" className="btn btn-info" onClick={()=>showAnswear ()}>
          Показать ответ
        </button>
      </div>
    );
  };
  
  export default MainGame;
