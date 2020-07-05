/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MINI_GAMES_URL } from '../../constants/urlConstants';
import test from './test.json';

const TestEnglish = () => {
  const [numberCorrectAnswers, setNumberCorrectAnswers] = useState(0);
  const [errorResult, setErrorResult] = useState(false);
  const radioButton = React.createRef();
  let arrAnswers = [];
  const handleGetResult = () => {
    arrAnswers = [];
    radioButton.current.childNodes.forEach((item) =>
      item.childNodes.forEach(
        (elem) =>
          elem &&
          elem.childNodes.forEach(
            (check) => check.checked && arrAnswers.push(check.value),
          ),
      ),
    );
    if (arrAnswers.length === 25) {
      let arrCorretAnswers = 0;
      test.forEach((item) => {
        if (arrAnswers.indexOf(item.correctAnswer) > 0) {
          arrCorretAnswers += +1;

          setNumberCorrectAnswers(arrCorretAnswers);
        }
      });
    } else {
      setErrorResult(true)
    }
  };
  return (
    <div className="wrapper__test" ref={radioButton}>
      <h2>
        For the questions below, please choose the best option to complete the
        sentence or conversation.
      </h2>
      {test.map((item, index) => {
        return (
          <ul key={item.question}>
            <p>
              <span>{index + 1}. </span>
              {item.question}
            </p>
            {item.answers.map((elem) => (
              <li key={elem}>
                <input
                  type="radio"
                  value={elem}
                  name={`question${index + 1}`}
                  id={elem}
                />
                <label type="button" htmlFor={elem}>
                  {elem}
                </label>
              </li>
            ))}
          </ul>
        );
      })}
      <div className='wrapper__btn-result'>
      {errorResult && <span className='error-result'>Please answer all questions.</span>}
        <button
          rol="tab"
          type="button"
          className="badge badge-success"
          onClick={handleGetResult}
        >
          Get Result
        </button>
      </div>

      {numberCorrectAnswers && (
        <div className="result__test">
          <div className="col-lg-4 ">
            <div className="bs-component">
              <div className="alert alert-dismissible alert-secondary">
                <NavLink
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  to={MINI_GAMES_URL}
                >
                  ×
                </NavLink>
                <p>{numberCorrectAnswers} correct answers out of 20</p>
                <p>
                  We recommend starting at level{' '}
                  {numberCorrectAnswers < 13
                    ? '1'
                    : numberCorrectAnswers < 17
                    ? '3'
                    : numberCorrectAnswers < 22
                    ? '4'
                    : '6'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestEnglish;
