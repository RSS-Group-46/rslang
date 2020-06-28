/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-console */

import React, { Component } from 'react';
import getWords from './words';
import Loader from '../Loader/Loader';

class Savannah extends Component {
  constructor() {
    super();
    this.state = {
      keyClassName: '',
      word: '',
      translatedWord: '',
      words: [],
      translatedWords: [],
      translatedButtons: [],
      isMounted: false,
      isGameOver: false,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  async componentDidMount() {
    const { words, translatedWords } = await getWords();
    document.addEventListener('keydown', this.handleKeyPress);
    this.setState({
      word: words.next(),
      translatedWord: translatedWords.next(),
      words,
      translatedWords,
      isMounted: true,
    });
    const { translatedWord } = this.state;
    this.randomizeWords(translatedWord);
  }

  componentDidUpdate() {
    const { keyClassName, translatedWord, words, isGameOver } = this.state;

    if (
      keyClassName !== 0 &&
      keyClassName.length > 0 &&
      words.getLength() > 0
    ) {
      const buttonValue = this.getButtonValue(keyClassName);
      this.compare(buttonValue, translatedWord);
    } else if (words.getLength() === 0 && !isGameOver) {
      this.setState({
        isGameOver: true,
      });
    }
  }

  setKey(key) {
    switch (key) {
      case '1':
        return '.btn-first__value';

      case '2':
        return '.btn-second__value';

      case '3':
        return '.btn-third__value';

      case '4':
        return '.btn-fourth__value';

      default:
        return 0;
    }
  }

  getButtonValue(className) {
    const value = document.querySelector(className).textContent;
    return value;
  }

  compare(buttonValue, currentWord) {
    const { words, translatedWords } = this.state;

    if (currentWord.toLowerCase() === buttonValue.toLowerCase()) {
      const word = words.next();
      const translatedWord = translatedWords.next();
      this.setState({
        word,
        translatedWord,
      });
      this.randomizeWords(translatedWord);
    } else {
      // console.log('bad');
    }
  }

  randomizeWords(translatedWord) {
    const { translatedWords } = this.state;
    const translatedButtons = [];
    const correctWordIndex = Math.floor(Math.random() * 4);

    for (let i = 0; i < 4; i += 1) {
      const index = Math.round(
        Math.random() * (translatedWords.getLength() - 1),
      );

      if (i === correctWordIndex) {
        translatedButtons.push(translatedWord);
      } else {
        translatedButtons.push(translatedWords.getItem(index));
      }
    }

    this.setState({
      translatedButtons,
    });
  }

  compenntWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    const keyClassName = this.setKey(e.key);
    this.setState({
      keyClassName,
    });
  }

  render() {
    const { word, translatedButtons, isGameOver, isMounted } = this.state;
    if (!isMounted) {
      return <Loader />;
    } else if (isMounted && !isGameOver) {
      return (
        <div className="container">
          <span>{word}</span>
          <button className="btn btn-outline-danger" type="button">
            1 - <span className="btn-first__value">{translatedButtons[0]}</span>
          </button>
          <button className="btn btn-outline-danger" type="button">
            2 -{' '}
            <span className="btn-second__value">{translatedButtons[1]}</span>
          </button>
          <button className="btn btn-outline-danger" type="button">
            3 - <span className="btn-third__value">{translatedButtons[2]}</span>
          </button>
          <button className="btn btn-outline-danger" type="button">
            4 -{' '}
            <span className="btn-fourth__value">{translatedButtons[3]}</span>
          </button>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Game over</h1>
        </div>
      );
    }
  }
}

export default Savannah;
