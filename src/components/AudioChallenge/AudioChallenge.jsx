import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import ButtonNextWords from './ButtonDontKnowWords';
import StatisticAudioChallenge from './statistic';
// import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import {
  API_PART_SPEECH,
  API_SIMILAR_WORDS,
} from '../../constants/audioChallenge';
import Picture from './picture';
import '@fortawesome/fontawesome-free/js/all';

const AudioChallenge = ({ words, offLoader, settings }) => {
  const [numberWord, setNumberWord] = useState(1);
  const [listSimilarWords, setListSimilarWords] = useState();
  const [correctWord, setCorrectWord] = useState();
  const [inCorrectWord, setInCorrectWord] = useState();
  const [loader, setLoader] = useState(false);
  const [dontKnow, setDontKnow] = useState(false);
  const [showStatistic, setShowStatistic] = useState(false);
  const [arrCorrectAnswers, setArrCorrectAnswers] = useState([]);
  const [arrErrorAnswers, setArrErrorAnswer] = useState([]);
  console.log(settings.wordsPerDay);
  

  const handleButtonDontKnow = (e) => {
    if (numberWord === words.length -1) {
      setTimeout(() => setShowStatistic(true), 500);
    } 
    if (dontKnow || (dontKnow && e.key === 'Enter')) {
      setDontKnow(false);
      setNumberWord(+numberWord + 1);
      setLoader(true);
      setInCorrectWord(false)
    } else {
      setDontKnow(true);
      setCorrectWord(words[numberWord].id);
      console.log('dont know');
      
    }
  };

  const handleWord = (e) => {
    if (e.target.parentNode.id === words[numberWord].id) {
      setCorrectWord(e.target.parentNode.id);
      handleButtonDontKnow();
      setArrCorrectAnswers([...arrCorrectAnswers, words[numberWord]]);
      setInCorrectWord(false)
    }
    if (e.target.parentNode.id !== words[numberWord].id) {
      setInCorrectWord(e.target.parentNode.id);
      setTimeout(() => setCorrectWord(words[numberWord].id), 500);
      setDontKnow(true);
      setArrErrorAnswer([...arrErrorAnswers, words[numberWord]])  
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.id === words[numberWord].id) {
      setCorrectWord(words[numberWord].id);
      handleButtonDontKnow();
      setArrCorrectAnswers([...arrCorrectAnswers, words[numberWord]]);
    } else {
      setInCorrectWord(e.target.id);
      setTimeout(() => setCorrectWord(words[numberWord].id), 500);
      setDontKnow(true);
      handleButtonDontKnow();
      setArrErrorAnswer([...arrErrorAnswers, words[numberWord]])  
    }
  };
  // Audio
  const handleAudio = () => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${words[numberWord].audio}`,
    );
    audio.play();
  };

  // Get part speech
  useEffect(() => {
    if (words[numberWord]) {
      fetch(
        `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API_PART_SPEECH}&lang=en-en&text=${words[numberWord].word}`,
      )
        .then((response) => response.json())
        .then(({ def }) => {
          fetch(
            `https://api.wordassociations.net/associations/v1.0/json/search?apikey=${API_SIMILAR_WORDS}&text=${words[numberWord].wordTranslate}&lang=ru&limit=4&pos=${def[0].pos}`,
          )
            .then((response) => response.json())
            .then(({ response }) => {
              const arrWords = [
                ...response[0].items,
                {
                  item: words[numberWord].wordTranslate,
                  id: words[numberWord].id,
                },

              ];
              const listWords = arrWords.reduce((acc, el, index) => {
                return [...acc, { text: el.item, id: el.id ? el.id : index }];
              }, []);
              const shuffledArr = listWords.sort(() => {
                return Math.random() - 0.5;
              });
              setLoader(false);
              setListSimilarWords(shuffledArr);
              offLoader();
              handleAudio();

            })
            .catch(() => {
              setLoader(false);
            });
        })
        .catch(() => {
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  }, [words[numberWord]]);


  return (
    <>
      {loader && <Loader />}
      {showStatistic && <StatisticAudioChallenge arrCorrectAnswers={arrCorrectAnswers} arrErrorAnswers={arrErrorAnswers}/>}
      {dontKnow && <Picture img={words[numberWord].image} />}
      <div className="wrapper_audio" onClick={handleAudio} role="presentation">
        <i className="fas fa-volume-up fa-7x" />
        <p>{dontKnow && words[numberWord].word}</p>
      </div>
      <div className="list__word">
        {listSimilarWords &&
          listSimilarWords.map((element, index) => (
            // eslint-disable-next-line react/void-dom-elements-no-children
            <li
              type="button"
              className={
                correctWord === element.id ? 'guessed_word' : 'init_word'
              }
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex="0"
              key={element.id}
              id={element.id}
              onClick={handleWord}
              onKeyPress={handleKeyPress}
              role="presentation"
            >
              <span>
                {correctWord === element.id ? (
                  <i className="fas fa-check-circle" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={(+inCorrectWord === element.id && inCorrectWord && dontKnow) ? 'unknown_word' : ''}
              >
                {element.text.toLowerCase()}
              </span>
            </li>
          ))}
      </div>
      <ButtonNextWords
      arrCorrectAnswers={arrCorrectAnswers} arrErrorAnswers={arrErrorAnswers}
        handleButtonDontKnow={handleButtonDontKnow}
        state={dontKnow}
      />
    </>
  );
};
const mapStateToProps = ({settings}) => ({
  settings,
} )
export default connect(mapStateToProps)(AudioChallenge);
