/* eslint no-underscore-dangle: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React, { useContext, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { VOCABULARY_URL, LEARNED_URL, COMPLICATED_URL, DELETED_URL } from '../../constants/urlConstants';
import AuthContext from '../../contexts/auth.context';
import useUserAggregatedWords from "../../hooks/userAggregatedWords.hook";
import useWord from "../../hooks/word.hook";
import {
  ONLY_USER_HARD_WORDS,
  ONLY_USER_TRASH_WORDS,
  WORDS_PER_PAGE,
  ONLY_USER_WORDS
} from "../../constants/apiConstants";
import './Vocabulary.scss';

function Vocabulary({ path }) {
  const [words, setWords] = useState([]);
  const [group] = useState(null);
  const [page, setPage] = useState(1);
  const [maxWordsToDisplay, setMaxWordsToDisplay] = useState(WORDS_PER_PAGE);
  const { userId, token } = useContext(AuthContext);
  const { deleteUserWord, updateUserWord } = useWord();
  const [filter, setFilter] = useState(ONLY_USER_WORDS);

  useEffect(() => {
    setPage(1);
    if (path === COMPLICATED_URL) {
      setFilter({...ONLY_USER_HARD_WORDS});
    } else if (path === DELETED_URL) {
      setFilter({...ONLY_USER_TRASH_WORDS});
    } else {
      setFilter({...ONLY_USER_WORDS});
    }
  }, [path]);

  const { loading, data } = useUserAggregatedWords({ userId, token, group, page: page - 1, wordsPerPage: WORDS_PER_PAGE, filter });

  function deleteWord(id) {
    setWords(words.filter(word => word._id !== id));
  }

  useEffect(() => {
    if (!loading && data && data[0]) {
      const { paginatedResults, totalCount } = data[0];
      setWords(paginatedResults);
      setMaxWordsToDisplay(totalCount[0] ? totalCount[0].count : 1);
    }
  }, [loading, data]);

  function playPronunciation(target) {
    const src = target.getAttribute('data-audio');
    const audio = new Audio(`https://raw.githubusercontent.com/shevv920/rslang-data/master/${src}`);
    audio.play();
  }

  function deleteWordButton(word) {
    if (word.hasAttribute('data-id')) {
      const wordId = word.getAttribute('data-id');
      const toTrash = path !== DELETED_URL;
      if (toTrash) {
        const updateWord = {
          optional: {
            trash: true,
          },
        };
        updateUserWord({ userId, wordId, token, word: updateWord });
        deleteWord(wordId);
      } else {
        deleteUserWord({ userId, wordId, token });
        deleteWord(wordId);
      }
    }
  }

  function isWordDifficultForUser(isDifficult) {
    return isDifficult ? 'In difficult words' : 'Move to difficult words';
  }

  function handleDifficultWordsForUser(button) {
    const isDifficult = button.hasAttribute('data-difficult')
      && button.getAttribute('data-difficult') === 'true';
    if (button.closest('.word') && button.closest('.word').hasAttribute('data-id')) {
      button.setAttribute('data-difficult', !isDifficult);
      const wordId = button.closest('.word').getAttribute('data-id');
      const word = {
        optional: {
          difficult: !isDifficult,
        },
      };
      updateUserWord({ userId, wordId, token, word });

      if (path !== COMPLICATED_URL) {
        button.classList.toggle('btn-info');
        button.classList.toggle('btn-primary');
        button.innerText = isWordDifficultForUser(!isDifficult);
      } else {
        deleteWord(wordId);
      }
    }
  }

  function recoverWordForUser(word) {
    const wordId = word.hasAttribute('data-id') && word.getAttribute('data-id');
    if (wordId) {
      const wordBody = {
        optional: {
          trash: false,
        },
      };
      updateUserWord({ userId, wordId, token, word: wordBody });
      deleteWord(wordId);
    }
  }

  function handleClick({ target }) {
    if (target.classList.contains('word__audio') && target.hasAttribute('data-audio')) {
      playPronunciation(target);
    } else if (target.closest('.word__delete')
      && target.closest('.word__delete').parentNode.classList.contains('word')) {
      deleteWordButton(target.closest('.word__delete').parentNode);
    } else if (target.classList.contains('word__user-controller')) {
      if (path !== DELETED_URL) {
        handleDifficultWordsForUser(target);
      } else if (target.closest('.word')) {
        recoverWordForUser(target.closest('.word'));
      }
    }
  }

  function renderWordDifficulty(difficulty) {
    const result = [];
    for (let i = 0; i <= difficulty; i += 1) {
      result.push(<div key={i} className={`word__difficulty--${difficulty}`} />)
    }
    return result;
  }

  function renderWordExample(example, translate, key) {
    return (
      <div className="mb-2" key={key}>
        <div dangerouslySetInnerHTML={{ __html: example }} />
        <div dangerouslySetInnerHTML={{ __html: translate }} />
      </div>
    );
  }

  function renderPagination() {
    return (
      <div className="pagination">
        <Pagination
          activePage={page}
          itemsCountPerPage={WORDS_PER_PAGE}
          totalItemsCount={maxWordsToDisplay}
          pageRangeDisplayed={5}
          onChange={setPage}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    );
  }

  return (
    <div className="vocabulary container pt-1" onClick={handleClick} role="article">
      <div className="vocabulary-controls d-flex mb-2">
        <NavLink to={VOCABULARY_URL + LEARNED_URL} className="nav-link btn btn-secondary btn-sm px-3">
          Learning
        </NavLink>
        <NavLink to={VOCABULARY_URL + COMPLICATED_URL} className="nav-link btn btn-secondary btn-sm px-2">
          Difficult words
        </NavLink>
        <NavLink to={VOCABULARY_URL + DELETED_URL} className="nav-link btn btn-secondary btn-sm px-2">
          Trash
        </NavLink>
      </div>
      <div className="dictionary-cards container">
        {renderPagination()}
        {words && words.map((word) => (
            <div key={word._id} data-id={word._id} className="word row mb-5 container">
              <div className="col-sm-auto flex-column">
                <img
                  className="word__image img-thumbnail"
                  src={`https://raw.githubusercontent.com/shevv920/rslang-data/master/${word.image}`}
                  alt={word.word}
                />
                <div
                  className="word__difficulty"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Word difficulty"
                >
                  {renderWordDifficulty(word.group)}
                </div>
                {word.userWord && (
                  <button
                    className={
                      `word__user-controller mt-2 btn btn-block
                       ${(word.userWord.optional && word.userWord.optional.difficult)
                        ? 'btn-info'
                        : 'btn-primary'}`
                    }
                    type="button"
                    data-difficult={word.userWord.optional && word.userWord.optional.difficult}
                  >
                    {path !== DELETED_URL
                      ? isWordDifficultForUser(word.userWord.optional && word.userWord.optional.difficult)
                      : 'Move to learning words'}
                  </button>
                )}
              </div>
              <div className="col pr-0">
                <h4>{word.word}</h4>
                <div className="mb-2">
                  <span className="mr-2">{word.wordTranslate} {word.transcription}</span>
                  <button
                    className="word__audio"
                    type="button"
                    data-audio={word.audio}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Click to listen the pronunciation"
                  />
                </div>
                <div>
                  {renderWordExample(word.textMeaning, word.textMeaningTranslate, word._id + 1)}
                  {renderWordExample(word.textExample, word.textExampleTranslate, word._id + 2)}
                </div>
              </div>
              <div className="word__delete">
                <button
                  type="button"
                  className="close position-absolute"
                  aria-label="Close"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={path !== DELETED_URL ? 'Move to the trash' : 'Delete the word'}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
        ))}
        {!loading && words.length > 3 && renderPagination()}
      </div>
    </div>
  );
}

export default Vocabulary;
