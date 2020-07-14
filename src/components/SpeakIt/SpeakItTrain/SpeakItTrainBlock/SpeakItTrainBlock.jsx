import React, { useState, useEffect } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import Button from '../../UI/Button/Button';
import defaultTrainImg from '../../assets/images/train-img.jpg';
import { STATIC_URL, TRANSLATE_URL } from '../../constants/speakItConstants';

import './SpeakItTrainBlock.scss';

const SpeakItTrainBlock = ({ currentTrainLevel }) => {
  const [words, setWords] = useState([]);
  const [recognizedText, setRecognizedText] = useState('');
  const [page] = useState(0);
  const [image, setImage] = useState(`${defaultTrainImg}`);
  const [translate, setTranslate] = useState('');
  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log('words: ', words);
      setRecognizedText(result);

      if (words.find((word) => word.word === result)) {
        const newWords = words.map((word) => {
          if (word.word === result) {
            word.guessed = true;
          }
          return word;
        });
        setWords(newWords);
      }
    },
  });

  const wordsURL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${
    currentTrainLevel - 1
  }`;

  useEffect(() => {
    if (words.every((word) => word.guessed)) {
      stop();
      // and render new a bunch of words
    }
  }, [words]);

  useEffect(() => {
    axios
      .get(wordsURL)
      .then((response) => {
        const responseResult = response.data.slice(0, 10);
        setWords(responseResult);
      })
      .catch((error) => console.log(error));
  }, [wordsURL]);

  const getWordHandler = (word) => {
    const urlTranslate = `${TRANSLATE_URL}&text=${word.word}`;
    axios
      .get(urlTranslate)
      .then((response) => {
        const [wordTranslate] = response.data.text;
        setTranslate(wordTranslate);
      })
      .catch((error) => console.log(error));

    const imgUrl = `${STATIC_URL}${word.image}`;
    setImage(imgUrl);
  };

  const wordItem = () => {
    return words.map((word) => {
      const classes = word.guessed
        ? 'word-cards__card word-cards__card--guessed'
        : 'word-cards__card';
      return (
        <li
          key={shortid.generate()}
          className={classes}
          onClick={() => {
            stop();
            getWordHandler(word);
            speak({ text: word.word });
          }}
          role="presentation"
        >
          <p className="word-cards__text">{word.word}</p>
          <p className="word-cards__transcription">{word.transcription}</p>
        </li>
      );
    });
  };

  const classesRestart = 'train-buttons__restart';
  const classesSpeak = 'train-buttons__speak';
  const classesResult = 'train-buttons__results';

  return (
    <div className="train  container">
      <img className="train__img" src={image} alt="train" />
      <div className="train-word">
        <div className="train-word__train">{listening ? '' : translate}</div>
        <div className="train-word__speak">
          {listening && (
            <div className="train-word__speak-result">{recognizedText}</div>
          )}
        </div>
      </div>
      <ul className="word-cards">{wordItem()}</ul>
      <div className="train-buttons">
        <Button classes={classesRestart}>Restart</Button>
        {listening ? (
          <Button classes={classesSpeak} onClick={stop}>
            Stop listening
          </Button>
        ) : (
          <Button classes={classesSpeak} onClick={listen}>
            Speak please
          </Button>
        )}
        <Button classes={classesResult}>Results</Button>
      </div>
    </div>
  );
};

export default SpeakItTrainBlock;
