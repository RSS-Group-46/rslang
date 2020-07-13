import React, {useState, useContext, useRef, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectLearnedWords, selectStatistic, selectPassedCards, selectProcentCorrectAnswers, selectNewWords, selectLongSeriesCorrectAnswers } from '../../redux/selectors/statistic.selectors';
import { saveStatistic } from '../../redux/actions/statistic.actions';
import { pushUserStatistic, pullUserStatistic, prepareStatisticForApp } from '../../services/statistic.service';

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

import { getPlayData, getDataUrl, progressBarProcent} from './components/utils';
 
import './MainGame.scss';  


const MainGame = () => {

  const { userId, token } = useContext(AuthContext);
  const userData = { userId, token };
 // const showExample = useSelector(selectShowExample);
 // const showDescribe = useSelector(selectShowDescribe);
 


  let image = '';
  const settings = useSelector(selectSettings);

 const wordsPerRound = settings.wordsPerDay;

  const [currentGroup] = useState(0);
 // const [currentPage, setCurrentPage] = useState(0);
  const [wordImput, setUserWord] = useState('');
  const [currentWord, setCurrentWord] = useState(0);
  const [isShowAnswear, setShowAnswear] = useState(false);

  const [countArrWord, setCountArrWord] = useState(0);
  const [loadedStatistic, setLoadedStatistic] = useState(0);

  const [correctResponse,setCorrectResponse]= useState(0);
  const [badResponse,setBadResponse]= useState(0);
  const [lineCorrectResponse,setLineCorrectResponse]= useState(0);
  const [maxLineCorrectResponse,setMaxLineCorrectResponse]= useState(0);

  const [isWordGuessed, setIsWordGuessed] = useState(false);

  const [succesClasseName, setSuccesClasseName] = useState('none');
  const [dangerClasseName, setDangerClasseName] = useState('none');

  const learnedWordsNumber = useSelector(selectLearnedWords);
  const passedCardsNumber = useSelector(selectPassedCards);
  const procentCorrectAnswersNumber = useSelector(selectProcentCorrectAnswers);
  const newWordsNumber = useSelector(selectNewWords);
  const longSeriesCorrectAnswersNumber = useSelector(selectLongSeriesCorrectAnswers);
  const statistic = useSelector(selectStatistic);

  console.log(learnedWordsNumber,passedCardsNumber, procentCorrectAnswersNumber, newWordsNumber, longSeriesCorrectAnswersNumber)

  const dispatch = useDispatch();
  function saveStatisticClick (gettingStatistic) {
      pushUserStatistic(gettingStatistic, userData)
    dispatch(saveStatistic(gettingStatistic))
  }
 
  function setStattisticNew() {
      const learnedWords = loadedStatistic.learnedWords+ correctResponse;
      const passedCards = correctResponse;
      const procentCorrectAnswers = Math.round(correctResponse/(correctResponse+badResponse)*100);
      const newWords = correctResponse;
      const longSeriesCorrectAnswers =maxLineCorrectResponse;
      const currentPageFor = loadedStatistic.currentPageFor+1;

      const gettingStatistic = {
      learnedWords, passedCards, procentCorrectAnswers, newWords, longSeriesCorrectAnswers, currentPageFor 
    }
    console.log(gettingStatistic)
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
    filter: { "$or": [{ "page": loadedStatistic.currentPageFor }, { "page": loadedStatistic.currentPageFor + 1 }] },
  };

const { data } = useUserAggregatedWords(wordsConfig);
const wordsRaw = data && data[0].paginatedResults || [];
console.log(data)
const wordObj = getPlayData(wordsRaw[countArrWord]);

 console.log(loadedStatistic)

useEffect(() => {
  if (userData) {
    pullUserStatistic(userData)
      .then(dataExp => {
        if (dataExp) {
          setLoadedStatistic(prepareStatisticForApp(dataExp))
        }
      })
  }
}, [isWordGuessed]);



console.log(pullUserStatistic,prepareStatisticForApp,setLoadedStatistic )


function imageUrl (){
  if (wordObj.image) {
    image = getDataUrl (wordObj.image)
  } else {
    image = '';
  }
  return image;
}


 if (settings===5){
  console.log(setStattisticNew(),
  pushUserStatistic(statistic, userData))}

  function showAnswear () {
    setShowAnswear (true);
  }



  function getSuccesClasseName (){
    setSuccesClasseName ('text-success')
  };

  function getDangerClasseName (){
    setDangerClasseName ('text-danger')
  };

  function removeSuccesClasseName (){
    setDangerClasseName ('none')
  };

  function removeDangerClasseName (){
    setSuccesClasseName ('none')
  };


  const [retfocus, setRetfocus] = useState(false);
  function returnfocus () {
    if (retfocus) {
      setRetfocus (false)
    } else {
      setRetfocus (true)
    }
  }

  const [progressBarValue,setProgressBarValue]= useState(0);

  useEffect(() => {
    setProgressBarValue(progressBarProcent(currentWord,wordsRaw))
  }, [currentWord]);


  function enterAnswear () {
    setProgressBarValue(progressBarProcent(currentWord,wordsRaw))
    removeDangerClasseName ()
    removeSuccesClasseName ()
    returnfocus ()

    if (wordImput===wordObj.word && isWordGuessed) {
      setCountArrWord (countArrWord+1)
   
      deleteImputValue ();
      setIsWordGuessed(false);
      setShowAnswear (false);
    }

    if (wordImput===wordObj.word && !isWordGuessed) {
      setCurrentWord (currentWord +1);
        setLineCorrectResponse(lineCorrectResponse+1)
        console.log(lineCorrectResponse)
        if(lineCorrectResponse>=(maxLineCorrectResponse)){
          setMaxLineCorrectResponse(lineCorrectResponse+1);
        }
    
      setCorrectResponse (correctResponse + 1)
      childRef.current.playAudio()
      setShowAnswear (true);
      setIsWordGuessed(true);
      getSuccesClasseName ();
      
    }

    if (!(wordImput===wordObj.word) && !isWordGuessed) {
      setLineCorrectResponse(0)
      setBadResponse (badResponse + 1)
      childRef.current.playAudio();
      getDangerClasseName ();
    }
    if (currentWord >=wordsRaw.length){
      
      setStattisticNew()
    } 
    console.log('current',currentWord,wordsRaw.length)
  }
  console.log(progressBarValue,correctResponse,badResponse,lineCorrectResponse,maxLineCorrectResponse)

 
  const ariaValuenow = 50;
  const ariaValuemin = 0;
  const ariaValuemax = 100;
    
  const styleWidth = {width: `${progressBarValue}%`}
    return (
      <div className="maingame  container" >
        <p className="card-title maingame__translation">
        <span className="badge badge-pill badge-light">Выучено слов -</span>
          <span className="badge badge-pill badge-success">{correctResponse}</span>
          <span className="badge badge-pill badge-light"> запланировано выучить - </span>
          <span className="badge badge-pill badge-info">{wordsRaw.length}</span></p>
        <div className="progress">
          <div className="progress-bar progress-bar-striped bg-info" style={styleWidth} role="progressbar" aria-valuenow={ariaValuenow} aria-valuemin={ariaValuemin} aria-valuemax={ariaValuemax}> </div>
        </div>
        <div className="container__wrap">
          <button type="button" className="maingame__button">&#60;</button>
          <div className="card bg-light mb-3" >
            <div className="card-header maingame__header">
              <AssociationPicture srcAssociationPicture={ imageUrl() } />
            </div>
            <div className="card-body" >
            
                  <span className={succesClasseName}>Правильно!</span>
                  <span className={dangerClasseName}>Не правино!</span>
                
                <h4 className="card-title" >
                  <TextExample wordObj={wordObj} isShowAnswear={isShowAnswear}
                    setUserWord={setUserWord} 
                    wordImput={wordImput}
                    retfocus={retfocus}
                    />
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
          <button type="button" 
          className="maingame__button" 
          onClick={()=>enterAnswear ()}
          
          >&#62;</button>
        </div>
        <div className="container__wrap">
          <button type="button" className="btn btn-info" onClick={()=>showAnswear ()}>
            Показать ответ
          </button>
          <button type="button" className="btn btn-success" onClick={()=>enterAnswear ()}>
            Проверить ответ
          </button>
        </div>
      </div>
    );
  };
  
  export default MainGame;
