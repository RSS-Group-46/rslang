import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import ButtonNextWords from './ButtonDontKnowWords';
import StatisticAudioChallenge from './statistic';
import OnlyLearnedWords from './OnlyLearnedWords';
import ButtonLevel from './ButtonLevel';
import ButtonRound from './ButtonRound';
import StatisticDetaile from './StatisticDetaile';
import { API_SIMILAR_WORDS } from '../../constants/audioChallenge';
import Picture from './picture';
import ProgressRound from './ProgressRound';
import '@fortawesome/fontawesome-free/js/all';

const AudioChallenge = ({
  words,
  offLoader,
  handleOnlyLearnedWords,
  handleLevel,
  level,
  handleRound,
  round,
  numberWord,
  changeNumberWord,
  settings,
  knowWords,
  token,
  userId,
}) => {
  const [listSimilarWords, setListSimilarWords] = useState();
  const [correctWord, setCorrectWord] = useState();
  const [inCorrectWord, setInCorrectWord] = useState();
  const [loader, setLoader] = useState(false);
  const [dontKnow, setDontKnow] = useState(false);
  const [showStatistic, setShowStatistic] = useState(false);
  const [arrCorrectAnswers, setArrCorrectAnswers] = useState([]);
  const [arrErrorAnswers, setArrErrorAnswer] = useState([]);
  const [showStatisticDetaile, setShowStatisticDetaile] = useState(false);
  const eventType = 'Enter';

  const partsSpeech = {
    n: 'noun',
    v: 'verb',
    j: 'adjective',
    r: 'adverb',
    prp: 'preposition',
    prn: 'pronoun',
    crd: 'cardinal number',
    cjc: 'conjunction',
    exc: 'interjection',
    det: 'article',
    abb: 'abbreviation',
    x: 'particle',
    ord: 'ordinal number',
    md: 'modal verb',
    ph: 'phrase',
    phi: 'idiom',
  };
  // eslint-disable-next-line no-underscore-dangle
  const wordId = words[numberWord].id ? words[numberWord].id : words[numberWord]._id;
  const handleButtonDontKnow = (e) => {
    if (numberWord === words.length - 1) {
      setShowStatistic(true);
    }
    if (dontKnow || (dontKnow && e.key === eventType)) {
      setDontKnow(false);
      changeNumberWord();
      setLoader(true);
      setInCorrectWord(false);
    } else {
      setDontKnow(true);
      setCorrectWord(wordId);
    }
  };

  const handleWord = (e) => {
    if (e.target.parentNode.id === wordId) {
      setCorrectWord(e.target.parentNode.id);
      handleButtonDontKnow();
      setArrCorrectAnswers([...arrCorrectAnswers, words[numberWord]]);
      setInCorrectWord(false);
    }
    if (e.target.parentNode.id !== wordId) {
      setInCorrectWord(e.target.parentNode.id);
      setCorrectWord(wordId);
      setDontKnow(true);
      setArrErrorAnswer([...arrErrorAnswers, words[numberWord]]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === eventType && e.target.id === wordId) {
      setCorrectWord(wordId);
      handleButtonDontKnow();
      setArrCorrectAnswers([...arrCorrectAnswers, words[numberWord]]);
    } else {
      setInCorrectWord(e.target.id);
      setCorrectWord(wordId);
      setDontKnow(true);
      handleButtonDontKnow();
      setArrErrorAnswer([...arrErrorAnswers, words[numberWord]]);
    }
  };

  const handleAudio = () => {
    const audio = new Audio(
      `https://raw.githubusercontent.com/irinainina/rslang-data/master/${words[numberWord].audio}`,
    );
    audio.play();
  };

  const handleStatisticDetaile = () =>
    setShowStatisticDetaile(!showStatisticDetaile);

  useEffect(() => {
    if (words[numberWord]) {
      fetch(
        `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${words[numberWord].word}`,
      )
        .then((response) => response.json())
        .then((data) => {
          const partSpeechWord = data.filter(
            (item) => item.text === words[numberWord].word,
          );
          fetch(
            `https://api.wordassociations.net/associations/v1.0/json/search?apikey=${API_SIMILAR_WORDS}&text=${
              partSpeechWord[0].meanings[0].translation.text
            }&lang=ru&limit=4&pos=${
              partsSpeech[partSpeechWord[0].meanings[0].partOfSpeechCode]
            }`,
          )
            .then((response) => response.json())
            .then(({ response }) => {
              const arrWords = [
                ...response[0].items,
                {
                  item: response[0].text,
                  id: wordId,
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
      {showStatistic && (
        <StatisticAudioChallenge
          arrCorrectAnswers={arrCorrectAnswers}
          arrErrorAnswers={arrErrorAnswers}
          size={words.length}
          round={round}
          level={level}
          knowWords={knowWords}
          token={token}
          userId={userId}
        />
      )}
      <div className="game-mode">
        <ProgressRound current={numberWord} size={words.length} />
        <OnlyLearnedWords handleOnlyLearnedWords={handleOnlyLearnedWords} />
        <ButtonLevel handleLevel={handleLevel} level={level} />
        <ButtonRound handleRound={handleRound} round={round} />
        <StatisticDetaile
          token={token}
          userId={userId}
          showStatisticDetaile={showStatisticDetaile}
          handleStatisticDetaile={handleStatisticDetaile}
        />
      </div>
      <div className="picture__wrapper">
        {(dontKnow || settings.showAssociationPicture) && (
          <Picture img={words[numberWord].image} />
        )}
      </div>
      <div className="wrapper_audio" onClick={handleAudio} role="presentation">
        <i className="fas fa-volume-up fa-7x" />
        <p>{dontKnow && words[numberWord].word}</p>
        {settings.showTranscription && dontKnow && (
          <p>{words[numberWord].transcription}</p>
        )}
      </div>
      <div className="list__word">
        {listSimilarWords &&
          listSimilarWords.map((element, index) => (
            <li
              type="button"
              role="tab"
              aria-controls="t1-panel"
              className={
                correctWord === element.id ? 'guessed_word' : 'init_word'
              }
              tabIndex="0"
              key={element.id}
              id={element.id}
              onClick={handleWord}
              onKeyPress={handleKeyPress}
            >
              <span>
                {correctWord === element.id ? (
                  <i className="fas fa-check-circle" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={
                  +inCorrectWord === element.id && inCorrectWord && dontKnow
                    ? 'unknown_word'
                    : ''
                }
              >
                {element.text.toLowerCase()}
              </span>
            </li>
          ))}
      </div>
      <ButtonNextWords
        arrCorrectAnswers={arrCorrectAnswers}
        arrErrorAnswers={arrErrorAnswers}
        handleButtonDontKnow={handleButtonDontKnow}
        state={dontKnow}
      />
    </>
  );
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(AudioChallenge);
