/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Savannah.scss';
import Queue from '../../utils/Queue';

const lifes = new Queue(['*', '*', '*', '*', '*']);
const words = new Queue([]);

const getWords = async () => {
  try {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${Math.round(Math.random() * 29)}&group=${Math.round(Math.random() * 5)}`)
    const data = await response.json();

    data.forEach((el) => {
      words.add(el.word)
    })
  } catch (e) {
    // TODO: add notification with error
  }
}

getWords();

class Savannah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: words.next(),
      lifes: lifes.get(),
      key: '',
      gameOver: false,
      correct: 0,
      wrong: 0,
      innerValue: '',
    };
    this.counter = 2;
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      this.setState({
        key: e.key,
      });
    });

    document.querySelectorAll('.btn').forEach((el) => {
      el.addEventListener('click', (e) => {
        this.setState({
          innerValue: e.target.textContent,
        });
      });
    });

    this.setTimer();
  }

  componentDidUpdate() {
    if (
      this.state.lifes &&
      this.state.lifes.length > 0 &&
      this.counter % 2 === 0 &&
      this.state.word
    ) {
      this.compare(this.state.key);
      this.counter += 1;
    } else {
      this.counter += 1;
    }

    if (
      (this.state.lifes.length === 0 && !this.state.gameOver) ||
      (!this.state.word && !this.state.gameOver)
    ) {
      this.setState({
        gameOver: true,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => {
      this.setState({
        key: e.key,
      });
    });

    document.querySelectorAll('.btn').forEach((el) => {
      el.removeEventListener('click', (e) => {
        this.setState({
          innerValue: e.target.textContent,
        });
      });
    });

    this.resetTimer();
  }

  getKeyClassName(key) {
    switch (key) {
      case '1':
        return `.btn-${key}`;

      case '2':
        return `.btn-${key}`;

      case '3':
        return `.btn-${key}`;

      case '4':
        return `.btn-${key}`;

      default:
        return 0;
    }
  }

  setTimer() {
    this.timer = setInterval(() => {
      this.setState({
        word: words.next(),
      });
    }, 10000);
  }

  resetTimer() {
    clearInterval(this.timer);

    document.querySelector('.drop').style.webkitAnimation = 'none';

    this.timer = setInterval(() => {
      this.setState({
        word: words.next(),
      });
    }, 10000);

    if (this.state.word) {
      setTimeout(() => {
        if (document.querySelector('.drop')) {
          document.querySelector('.drop').style.webkitAnimation = '';
        }
      }, 1000);
    }
  }

  compare(value) {
    let keyValue;

    const className = this.getKeyClassName(value);

    if (className !== 0 && this.state.key && this.state.key.length > 0) {
      keyValue = document.querySelector(className).textContent.toLowerCase();
    }

    if (this.state.innerValue && this.state.innerValue.length > 0) {
      keyValue = this.state.innerValue;
    }

    if (
      (this.state.key &&
        this.state.key.length > 0 &&
        keyValue === this.state.word.toLowerCase()) ||
      (this.state.innerValue &&
        this.state.innerValue.length > 0 &&
        keyValue === this.state.word.toLowerCase())
    ) {
      this.resetTimer();

      const newCorrect = this.state.correct + 1;

      this.setState({
        prevWord: this.state.word,
        word: words.next(),
        key: '',
        correct: newCorrect,
        innerValue: '',
      });
    } else if (
      (keyValue !== this.state.word &&
      this.state.word !== this.state.prevWord &&
      typeof keyValue !== 'undefined') ||
      !!keyValue
    ) {
      this.resetTimer();
      lifes.remove();

      const newWrong = this.state.wrong + 1;

      this.setState({
        lifes: lifes.get(),
        wrong: newWrong,
      });
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.gameOver === true ? (
          <div>
            <h1>Game over! {this.state.lifes.length === 0 ? '=(' : '=)'}</h1>
            <h2>Statistics:</h2>
            <h3>
              Corret answers: {this.state.correct} (
              {Math.floor(
                (this.state.correct / (this.state.wrong + this.state.correct)) *
                  100,
              ) || 0}
              %)
            </h3>
            <h3>
              Wrong answers: {this.state.wrong} (
              {Math.floor(
                (this.state.wrong / (this.state.wrong + this.state.correct)) *
                  100,
              ) || 0}
              %)
            </h3>
          </div>
        ) : (
          <>
            <div>
              <button className="btn btn-warning btn-1" type="button">
                hello
              </button>
              <button className="btn btn-warning btn-2" type="button">
                world
              </button>
            </div>
            <div>
              <button className="btn btn-warning btn-3" type="button">
                this
              </button>
              <button className="btn btn-warning btn-4" type="button">
                is
              </button>
            </div>
            <div>
              {this.state.lifes.map((el) => {
                return (
                  <FontAwesomeIcon
                    key={el + Math.random()}
                    icon={faStar}
                    className="m-2"
                  />
                );
              })}
            </div>
            <div>
              <h1 className="drop">{this.state.word}</h1>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Savannah;
