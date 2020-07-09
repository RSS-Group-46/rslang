/* eslint-disable */
import Queue from '../../utils/Queue';

export default function savannahUtils() {
  const value = localStorage.getItem('userData');
  const { userId, token } = JSON.parse(value === null ? '{}' : value);
  let timer;

  const setKey = (key) => {
    switch (key) {
      case '1':
        return '.btn-1__value';

      case '2':
        return '.btn-2__value';

      case '3':
        return '.btn-3__value';

      case '4':
        return '.btn-4__value';

      default:
        return 0;
    }
  };

  const setClick = (target) => {
    switch (target) {
      case 'btn-1__value':
        return '.btn-1__value';

      case 'btn btn-danger btn-1':
        return '.btn-1__value';

      case 'btn-2__value':
        return '.btn-2__value';

      case 'btn btn-danger btn-2':
        return '.btn-2__value';

      case 'btn-3__value':
        return '.btn-3__value';

      case 'btn btn-danger btn-3':
        return '.btn-3__value';

      case 'btn-4__value':
        return '.btn-4__value';

      case 'btn btn-danger btn-4':
        return '.btn-4__value';

      default:
        return 0;
    }
  };

  function getButtonValue(className) {
    return document.querySelector(className).textContent;
  }

  const randomize = (word, words) => {
    const buttons = [];
    const correctWordIndex = Math.floor(Math.random() * 4);

    for (let i = 0; i < 4; i += 1) {
      const index = Math.round(Math.random() * (words.getLength() - 1));

      if (i === correctWordIndex) {
        buttons.push(word);
      } else {
        buttons.push(words.getItem(index));
      }
    }

    return buttons;
  };

  const resetAnimation = (className = '.drop') => {
    let timer;
    if (document.querySelector(`${className}`).innerText.length <= 0) {
      timer = setTimeout(() => {
        document.querySelector(`${className}`).style.webkitAnimation = '';
      }, 200);
      document.querySelector(`${className}`).style.webkitAnimation = 'none';
    } else {
      clearInterval(timer);
    }
  };

  const initialState = {
    keyClassName: '',
    word: '',
    translatedWord: '',
    words: [],
    translatedWords: [],
    translatedButtons: [],
    lifes: [],
    correctAnswers: 0,
    wrongAnswers: 0,
    isMounted: false,
    isGameOver: false,
    userId,
    token,
  };

  const getMountedState = (words, translatedWords, lifes) => {
    const word = words.next();
    const translatedWord = translatedWords.next();
    const isMounted = true;

    return {
      word,
      translatedWord,
      words,
      translatedWords,
      lifes,
      isMounted,
    };
  };

  const getLearnedWords = async (id, tkn) => {
    try {
      const resposne = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`,
        {
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${tkn}`,
            Accept: 'application/json',
          },
        },
      );

      const data = await resposne.json();
    } catch (e) {
      // TODO: add toast notification
    }
  };

  const getWords = async (id, tkn) => {
    const haveLearnedWords = getLearnedWords(id, tkn);
    const words = new Queue([]);
    const translatedWords = new Queue([]);
    const ids = new Queue([]);
    if (haveLearnedWords) {
      try {
        const response = await fetch(
          `https://afternoon-falls-25894.herokuapp.com/words?page=${Math.round(
            Math.random() * 29,
          )}&group=${Math.round(Math.random() * 5)}`,
        );

        const data = await response.json();

        data.forEach((el) => {
          words.add(el.word);
          translatedWords.add(el.wordTranslate);
          ids.add(el.id);
        });
      } catch (e) {
        // TODO: add toast notification
      }
    }

    return { words, translatedWords, ids };
  };

  const getNewState = (
    words,
    translatedWords,
    lifes,
    correct,
    wrong,
    type = 'correct',
  ) => {
    const word = words.next();
    const translatedWord = translatedWords.next();
    const keyClassName = type === 'correct' ? 0 : '';
    let state;

    if (type === 'correct') {
      const correctAnswers = correct + 1;
      state = {
        word,
        translatedWord,
        keyClassName,
        correctAnswers,
      };
    } else {
      const wrongAnswers = wrong + 1;
      lifes.remove();
      state = {
        word,
        translatedWord,
        keyClassName,
        lifes,
        wrongAnswers,
      };
    }

    return { state, translatedWord };
  };

  const setToStatistics = (arr, word, type = 'correct') => {
    let wordStatistics = {};
    if (type === 'correct') {
      wordStatistics = { word, correct: 1, wrong: 0 };
    } else {
      wordStatistics = { word, correct: 0, wrong: 1 };
    }
    arr.push(wordStatistics);
    return arr;
  };

  return {
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
  };
}