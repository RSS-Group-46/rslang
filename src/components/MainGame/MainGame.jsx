import React, {useState, useContext, useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { selectShowAssociationPicture } from '../../redux/selectors/settings.selectors';
import { selectLearnedWords, selectStatistic, selectPassedCards, selectProcentCorrectAnswers, selectNewWords, selectLongSeriesCorrectAnswers } from '../../redux/selectors/statistic.selectors';
import { saveStatistic } from '../../redux/actions/statistic.actions';
import { pushUserStatistic } from '../../services/statistic.service';


import { USER_DATA_STORAGE_NAME } from '../../constants/commonConstants';


import AssociationPicture from './components/AssociationPicture';
import TextExample from './components/TextExample';
import TextMeaning from './components/TextMeaning';
import Transcription from './components/Transcription';

import TextExampleTranslate from './components/TextExampleTranslate';
import TextMeaningTranslate from './components/TextMeaningTranslate';
import WordTranslate from './components/WordTranslate';
import Audio from './components/Audio';

import AuthContext from '../../contexts/auth.context';

import useUserAggregatedWords from '../../hooks/userAggregatedWords.hook';
import { selectSettings } from '../../redux/selectors/settings.selectors';

import { getPlayData, getDataUrl} from './components/utils';
import './MainGame.scss';  

let userData = localStorage.getItem(USER_DATA_STORAGE_NAME);
userData = JSON.parse(userData);

const MainGame = () => {
 // const showExample = useSelector(selectShowExample);
 // const showDescribe = useSelector(selectShowDescribe);



  let image = '';
  const settings = useSelector(selectSettings);

 const wordsPerRound = settings.wordsPerDay;
  const { userId, token } = useContext(AuthContext);
  const [currentGroup] = useState(0);
  const [currentPage] = useState(0);
  const [wordImput, setUserWord] = useState('');
  const [currentWord, setCurrentWord] = useState(0);
  const [isShowAnswear, setShowAnswear] = useState(false);

  const learnedWordsNumber = useSelector(selectLearnedWords);
  const passedCardsNumber = useSelector(selectPassedCards);
  const procentCorrectAnswersNumber = useSelector(selectProcentCorrectAnswers);
  const newWordsNumber = useSelector(selectNewWords);
  const longSeriesCorrectAnswersNumber = useSelector(selectLongSeriesCorrectAnswers);
  let statistic = useSelector(selectStatistic);

  console.log(passedCardsNumber, procentCorrectAnswersNumber, newWordsNumber, longSeriesCorrectAnswersNumber)

  const dispatch = useDispatch();
  function saveStatisticClick (gettingStatistic) {
    statistic = gettingStatistic;
    dispatch(saveStatistic(statistic))
  }

  function setStattisticNew() {
      const learnedWords = currentWord+learnedWordsNumber;
      const passedCards = currentWord;
      const procentCorrectAnswers = currentWord;
      const newWords = currentWord;
      const longSeriesCorrectAnswers =currentWord;

      const gettingStatistic = {
      learnedWords, passedCards, procentCorrectAnswers, newWords, longSeriesCorrectAnswers
    }
    saveStatisticClick (gettingStatistic)
  }



  
  function deleteImputValue (){
    setUserWord('')
  }

  const childRef = useRef();

  const wordsConfig = {
    userId,
    token,
    group: currentGroup,
    wordsPerPage: wordsPerRound,
    filter: { "$or": [{ "page": currentPage }, { "page": currentPage + 1 }] },
  };

const { data } = useUserAggregatedWords(wordsConfig);
const wordsRaw = data && data[0].paginatedResults || [];

const wordObj = getPlayData(wordsRaw[currentWord]);


function imageUrl (){
  if (wordObj.image) {
    image = getDataUrl (wordObj.image)
  } else {
    image = '';
  }
  return image;
}

  if (currentWord >= wordsPerRound) {
    setStattisticNew()
    pushUserStatistic(statistic, userData)
  }

  

  function showAnswear () {
    setShowAnswear (true);
  }

  function enterAnswear () {
    childRef.current.playAudio()
    if (wordImput===wordObj.word) {
      setShowAnswear (true);
      setCurrentWord (currentWord +1);
      setShowAnswear (false);
      deleteImputValue ();
      
    }


    
  }

  function eventKeyupEnter (event) {
    if (event.keyCode === 13) {
      enterAnswear ()
    }
  }

  document.addEventListener("onclick", (event) => {
    eventKeyupEnter (event)
  });

    return (
      <div className="maingame  container">
        <div className="container__wrap">
          <button type="button" className="maingame__button">&#60;</button>
          <div className="card bg-light mb-3" >
            <div className="card-header maingame__header">
              <AssociationPicture srcAssociationPicture={ imageUrl() } />
            </div>
            <div className="card-body">
                <h4 className="card-title">
                  <TextExample wordObj={wordObj} isShowAnswear={isShowAnswear}
                    setUserWord={setUserWord} wordImput={wordImput}/>
                </h4>
                <Transcription wordObj={wordObj} isShowAnswear={isShowAnswear}/>
                <TextMeaning wordObj={wordObj} isShowAnswear={isShowAnswear}/>
                <p className="card-text maingame__line">__________________________________</p>
                <TextExampleTranslate wordObj={wordObj} />
                <TextMeaningTranslate wordObj={wordObj}/>
                <WordTranslate wordObj={wordObj}/>
                <Audio wordObj={wordObj} ref={childRef} />
            </div>
          </div>
          <button type="button" className="maingame__button" onClick={()=>enterAnswear ()}>&#62;</button>
        </div>
        <button type="button" className="btn btn-info" onClick={()=>showAnswear ()}>
          Показать ответ
        </button>
      </div>
    );
  };
  
  export default MainGame;
