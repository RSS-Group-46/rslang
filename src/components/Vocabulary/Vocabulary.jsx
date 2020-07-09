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
import { ONLY_USER_WORDS, WORDS_PER_PAGE } from "../../constants/apiConstants";
import './Vocabulary.scss';

function Vocabulary() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(0);
  const [maxWordsToDisplay, setMaxWordsToDisplay] = useState(WORDS_PER_PAGE);
  const { userId, token } = useContext(AuthContext);
  const { deleteUserWord } = useWord();

  const { loading, data } = useUserAggregatedWords({ userId, token, group: page, wordsPerPage: WORDS_PER_PAGE, filter: ONLY_USER_WORDS })

  useEffect(() => {
    if (!loading && data && data[0]) {
      const { paginatedResults, totalCount } = data[0];
      if (paginatedResults.length && totalCount[0]) {
        setWords(paginatedResults);
        setMaxWordsToDisplay(totalCount[0].count);
      }
    }
  }, [loading, data]);

  function playPronunciation(target) {
    const src = target.getAttribute('data-audio');
    const audio = new Audio(`https://raw.githubusercontent.com/shevv920/rslang-data/master/${src}`);
    audio.play();
  }

  function deleteWord(word) {
    if (word.hasAttribute('data-id')) {
      const wordId = word.getAttribute('data-id');
      if (deleteUserWord({ userId, wordId, token })) {
        word.remove();
      }
    }
  }

  function handleClick({ target }) {
    if (target.classList.contains('word__audio') && target.hasAttribute('data-audio')) {
      playPronunciation(target);
    } else if (target.closest('.word__delete')
      && target.closest('.word__delete').parentNode.classList.contains('word')) {
      deleteWord(target.closest('.word__delete').parentNode);
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

  function handlePageChange(pageNumber) {
    setPage(pageNumber - 1);
  }

  function renderPagination() {
    return (
      <div className="pagination">
        <Pagination
          activePage={page + 1}
          itemsCountPerPage={WORDS_PER_PAGE}
          totalItemsCount={maxWordsToDisplay}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
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
            <div key={word._id} data-id={word._id} className="word row mb-2 container">
              <div className="col-sm-auto flex-column">
                <img
                  className="word__image img-thumbnail"
                  src={`https://raw.githubusercontent.com/shevv920/rslang-data/master/${word.image}`}
                  alt={word.word}
                />
                <div className="word__difficulty">{renderWordDifficulty(3)}</div>
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
                <button type="button" className="close position-absolute" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
        ))}
        {!loading && !!words.length && renderPagination()}
      </div>
    </div>
  );
}

export default Vocabulary;
