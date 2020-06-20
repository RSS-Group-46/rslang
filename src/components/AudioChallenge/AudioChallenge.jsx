import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import ButtonNextWords from './ButtonDontKnowWords';
import {
  API_PART_SPEECH,
  API_SIMILAR_WORDS,
} from '../../constants/audioChallenge';
import Picture from './picture';
import '@fortawesome/fontawesome-free/js/all';

const AudioChallenge = ({ words, offLoader }) => {
  const [numberWord, setNumberWord] = useState(1);
  const [partSpeech, setPartSpeech] = useState();
  const [listSimilarWords, setListSimilarWords] = useState();
  const [correctWord, setCorrectWord] = useState();
  const [inCorrectWord, setInCorrectWord] = useState();
  const [loader, setLoader] = useState(false);
  const [dontKnow, setDontKnow] = useState(false);
  
  const handleButtonDontKnow = () => {
    if (dontKnow) {
      setDontKnow(false)
      setNumberWord(+numberWord + 1);
      setLoader(true);
      setInCorrectWord('1232');
      
    } else {
      setDontKnow(true);
      setCorrectWord(words[numberWord].id);
    }
  };
  const handleWord = (e) => {
    if (e.target.parentNode.id === words[numberWord].id) {
      setCorrectWord(e.target.parentNode.id);
      handleButtonDontKnow()
    } else {
      setInCorrectWord(e.target.parentNode.id);
      setTimeout(() => setCorrectWord(words[numberWord].id), 500);
      setDontKnow(true)
    }
  };


  const handleAudio = () => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${words[numberWord].audio}`,
    );
    audio.play();
  };

  // Get part speech
  useEffect(() => {
    if (words) {
      fetch(
        `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API_PART_SPEECH}&lang=en-ru&text=${words[numberWord].word}`,
      )
        .then((response) => response.json())
        .then(({ def }) => {
          setPartSpeech(def[0].pos);
        });
    }
  }, [words]);
  // get similar words
  useEffect(() => {
    if (partSpeech) {
      fetch(
        `https://api.wordassociations.net/associations/v1.0/json/search?apikey=${API_SIMILAR_WORDS}&text=${words[numberWord].wordTranslate}&lang=ru&limit=4&pos=${partSpeech}`,
      )
        .then((response) => response.json())
        .then(({ response }) => {
          const arrWords = [
            ...response[0].items,
            { item: words[numberWord].wordTranslate, id: words[numberWord].id },
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
          setTimeout(() => handleAudio(), 500);
        });
    }
  }, [partSpeech, numberWord]);

  return (
    <>
      {loader && <Loader />}
      {dontKnow && <Picture img={words[numberWord].image} />}
      <div className='wrapper_audio' onClick={handleAudio} role="presentation">
        <i className="fas fa-volume-up fa-7x" />
        <p>{dontKnow && words[numberWord].word}</p>
      </div>
      <ul className="list__word">
        {listSimilarWords &&
          listSimilarWords.map((element, index) => (
            <li
              className={
                correctWord === element.id ? 'guessed_word' : 'init_word'
              }
              key={element.id}
              id={element.id}
              onClick={handleWord}
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
                className={+inCorrectWord === element.id ? 'unknown_word' : ''}
              >
                {element.text.toLowerCase()}
              </span>
            </li>
          ))}
      </ul>
      <ButtonNextWords
        handleButtonDontKnow={handleButtonDontKnow}
        state={dontKnow}
      />
    </>
  );
};
export default AudioChallenge;
