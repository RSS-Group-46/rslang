import React, {useState} from 'react';
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
        "_id": "5e9f5ee35eb9e72bc21af4a3",
        "group": 0,
        "page": 0,
        "word": "arrive",
        "image": "files/01_0003.jpg",
        "audio": "files/01_0003.mp3",
        "audioMeaning": "files/01_0003_meaning.mp3",
        "audioExample": "files/01_0003_example.mp3",
        "textMeaning": "To <i>arrive</i> is to get somewhere.",
        "textExample": "They <b>arrived</b> at school at 7 a.m.",
        "transcription": "[əráiv]",
        "textExampleTranslate": "Они прибыли в школу в 7 часов утра",
        "textMeaningTranslate": "Приехать значит попасть куда-то",
        "wordTranslate": "прибыть",
        "wordsPerExampleSentence": 7
      }`

  const wordObj = JSON.parse(wordJSONfromBack)
  

const MainGame = () => {

  const [isShowAnswear, setShowAnswear] = useState(false);

  function showAnswear () {
    setShowAnswear (true);
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
                <Transcription wordObj={wordObj} isShowAnswear={isShowAnswear}/>
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
