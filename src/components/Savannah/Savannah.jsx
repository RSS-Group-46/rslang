/* eslint-disable react/no-did-update-set-state */
/* eslint-disable */
import React, { Component } from 'react';
import Loader from '../Loader/Loader';
import GameOver from './UI/GameOver';
import Game from './UI/Game';
import Queue from '../../utils/Queue';
import savannahUtils from './utils';
import './Savannah.scss';

const {
  setKey,
  getButtonValue,
  randomize,
  resetAnimation,
  initialState,
  getMountedState,
  getWords,
  getNewState,
  setClick,
  setToStatistics,
} = savannahUtils();

class Savannah extends Component {
  constructor() {
    super();
    this.state = {
      ...initialState,
    };
    this.stats = [];
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { userId, token } = this.state;
    const { words, translatedWords, ids } = await getWords(userId, token);
    const lifes = new Queue(['*', '*', '*', '*', '*']);
    const mountedState = getMountedState(words, translatedWords, lifes);

    this.setListeners();

    this.setState({
      ...mountedState,
    });

    const { translatedWord } = this.state;
    this.setTimer();
    this.randomizeWords(translatedWord);
  }

  componentDidUpdate() {
    const {
      keyClassName,
      translatedWord,
      words,
      isGameOver,
      lifes,
    } = this.state;

    const gameOn =
      keyClassName !== 0 && keyClassName.length > 0 && words.getLength() > 0;
    const gameOver =
      (words.getLength() === 0 || lifes.getLength() === 0) && !isGameOver;

    if (gameOn) {
      const buttonValue = getButtonValue(keyClassName);
      this.compare(buttonValue, translatedWord);
    } else if (gameOver) {
      this.setState({
        isGameOver: true,
      });
      this.removeListeners();
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  setListeners() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('click', this.handleClick);
  }

  setTimer() {
    this.timer = setInterval(() => {
      const { words, translatedWords } = this.state;
      const word = words.next();
      const translatedWord = translatedWords.next();

      this.setState({
        word,
        translatedWord,
      });

      this.randomizeWords(translatedWord);
    }, 10000);
  }

  compare(buttonValue, currentWord) {
    const {
      words,
      translatedWords,
      lifes,
      keyClassName,
      correctAnswers,
      wrongAnswers,
    } = this.state;
    const isEquals = currentWord.toLowerCase() === buttonValue.toLowerCase();
    const isntEquals =
      keyClassName === 0 ||
      currentWord.toLowerCase() !== buttonValue.toLowerCase();

    if (isEquals) {
      setToStatistics(this.stats, currentWord);
      const { state, translatedWord } = getNewState(
        words,
        translatedWords,
        lifes,
        correctAnswers,
        wrongAnswers,
      );
      this.setState({
        ...state,
      });
      this.randomizeWords(translatedWord);
      this.resetTimer();
    } else if (isntEquals) {
      setToStatistics(this.stats, currentWord, 'wrong');
      const { state, translatedWord } = getNewState(
        words,
        translatedWords,
        lifes,
        correctAnswers,
        wrongAnswers,
        'wrong',
      );
      this.setState({
        ...state,
      });
      this.randomizeWords(translatedWord);
    }
  }

  randomizeWords(translatedWord) {
    const { translatedWords } = this.state;
    const translatedButtons = randomize(translatedWord, translatedWords);
    this.setState({
      translatedButtons,
    });
  }

  handleKeyPress(e) {
    const keyClassName = setKey(e.key);
    this.setState({
      keyClassName,
    });
  }

  handleClick(e) {
    const keyClassName = setClick(e.target.className);
    this.setState({
      keyClassName,
    });
  }

  removeListeners() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('click', this.handleClick);
  }

  resetTimer() {
    clearInterval(this.timer);
    resetAnimation('.drop');
    this.setTimer();
  }

  render() {
    const {
      word,
      translatedButtons,
      isGameOver,
      isMounted,
      lifes,
      correctAnswers,
      wrongAnswers,
    } = this.state;

    return (
      <>
        {!isMounted && <Loader />}
        {isMounted && !isGameOver && (
          <Game lifes={lifes} buttons={translatedButtons} word={word} />
        )}
        {isGameOver && (
          <GameOver
            correct={correctAnswers}
            wrong={wrongAnswers}
            stats={this.stats}
          />
        )}
      </>
    );
  }
}

export default Savannah;
