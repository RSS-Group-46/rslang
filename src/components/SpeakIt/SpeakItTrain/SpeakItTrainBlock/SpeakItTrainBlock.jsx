import React, { useState, useEffect } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import Button from '../../UI/Button/Button';
import defaultTrainImg from '../../assets/images/train-img.jpg';

import './SpeakItTrainBlock.scss';
import { STATIC_URL, TRANSLATE_URL } from '../constants/speakItConstants';

const SpeakItTrainBlock = ({ currentTrainLevel }) => {
  const [words, setWords] = useState([]);
  const [page] = useState(0);
  const [image, setImage] = useState(`${defaultTrainImg}`);
  const [translate, setTranslate] = useState('');

  const wordsURL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${
    currentTrainLevel - 1
  }`;

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
      return (
        <li
          key={shortid.generate()}
          className="word-cards__card"
          onClick={() => getWordHandler(word)}
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
      <div className="train-word">{translate}</div>
      <ul className="word-cards">{wordItem()}</ul>
      <div className="train-buttons">
        <Button classes={classesRestart}>Restart</Button>
        <Button classes={classesSpeak}>Speak please</Button>
        <Button classes={classesResult}>Results</Button>
      </div>
    </div>
  );
};

export default SpeakItTrainBlock;
