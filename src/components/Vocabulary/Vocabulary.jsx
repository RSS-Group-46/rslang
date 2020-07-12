/* eslint no-underscore-dangle: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
/* eslint react/no-danger: 0 */

import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { VOCABULARY_URL, LEARNED_URL, COMPLICATED_URL, DELETED_URL } from '../../constants/urlConstants';
import AuthContext from '../../contexts/auth.context';
import useUserAggregatedWords from "../../hooks/userAggregatedWords.hook";
import useWord from "../../hooks/word.hook";
import Loader from "../Loader/Loader";
import {
  ONLY_USER_HARD_WORDS,
  ONLY_USER_TRASH_WORDS,
  WORDS_PER_PAGE,
  ONLY_USER_WORDS
} from "../../constants/apiConstants";
import { DIFFICULTY_DESCRIPTIONS } from "../../constants/settingsConstants";
import './Vocabulary.scss';

function Vocabulary({ path, settings }) {
  const {
    showAssociationPicture,
    showDeleteButton,
    showDescribe,
    showExample,
    showTranscription,
  } = settings;

  const [words, setWords] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
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

  const {
    loading,
    data,
  } = useUserAggregatedWords({ userId, token, group: difficulty, page: page - 1, wordsPerPage: WORDS_PER_PAGE, filter });

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

  function handleDropdown(dropdownButton) {
    const dropdown = dropdownButton.closest('.dropdown');
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    if (dropdownToggle && dropdownMenu) {
      dropdown.classList.toggle('show');
      dropdownMenu.classList.toggle('show');
      const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggle.setAttribute('aria-expanded', String(!isExpanded));

      if (dropdownButton.classList.contains('dropdown-item') && dropdownButton.hasAttribute('data-difficulty')) {
        const difficultyValue = dropdownButton.getAttribute('data-difficulty');
        setDifficulty(difficultyValue >= 0 ? difficultyValue : null);
      }
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
    } else if (target.closest('.dropdown') && target.closest('.dropdown').parentNode.classList.contains('filters')) {
      handleDropdown(target);
    }
  }

  function renderWordDifficulty(wordDifficulty) {
    const result = [];
    for (let i = 0; i <= wordDifficulty; i += 1) {
      result.push(<div key={i} className={`word__difficulty--${wordDifficulty}`} />)
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
      <Pagination
        activePage={page}
        itemsCountPerPage={WORDS_PER_PAGE}
        totalItemsCount={maxWordsToDisplay}
        pageRangeDisplayed={5}
        onChange={setPage}
        itemClass="page-item"
        linkClass="page-link"
      />
    );
  }

  return (
    <>
      {loading && <Loader />}
      <div className="vocabulary container pt-4 pb-5" onClick={handleClick} role="article">
      <div className="vocabulary-controls d-flex justify-content-between mb-2">
        <div className="links d-flex">
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
        <div className="filters">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown tooltip"
              aria-haspopup="true"
              aria-expanded="false"
              data-placement="top"
              title="Filter words difficulty"
            >
              Difficulty: {DIFFICULTY_DESCRIPTIONS[difficulty] ? DIFFICULTY_DESCRIPTIONS[difficulty] : 'All'}
            </button>
            <div className="dropdown-menu">
              <button
                className={`dropdown-item${difficulty === null ? ' active' : ''}`}
                type="button"
                data-difficulty="all"
              >
                All
              </button>
              {Object.entries(DIFFICULTY_DESCRIPTIONS).map(([key, difficultyValue]) => (
                <button
                  key={key}
                  className={`dropdown-item${difficulty === key ? ' active' : ''}`}
                  type="button"
                  data-difficulty={key}
                >
                  {difficultyValue}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="dictionary-cards pt-4 pb-5 container">
        {renderPagination()}
        <div className="dictionary-cards__container pt-4">
          {words && words.map((word) => (
              <div key={word._id} data-id={word._id} className="word row mb-5 container">
                <div className="col-sm-auto flex-column">
                  {showAssociationPicture && (
                    <img
                      className="word__image img-thumbnail"
                      src={`https://raw.githubusercontent.com/shevv920/rslang-data/master/${word.image}`}
                      alt={word.word}
                    />
                  )}
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
                    <span className="mr-2">{word.wordTranslate} {showTranscription && word.transcription}</span>
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
                    {showDescribe && renderWordExample(word.textMeaning, word.textMeaningTranslate, word._id + 1)}
                    {showExample && renderWordExample(word.textExample, word.textExampleTranslate, word._id + 2)}
                  </div>
                </div>
                {(showDeleteButton || path === DELETED_URL) && (
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
                )}
              </div>
          ))}
        </div>
        {!loading && words.length > 3 && renderPagination()}
      </div>
    </div>
    </>
  );
}

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(Vocabulary);
