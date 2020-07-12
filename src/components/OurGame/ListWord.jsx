import React, { useEffect, useState } from 'react';

const ListWord = (props) => {
  const {
    listSimilarWors,
    correctSentence,
    resultRound,
    selectWord,
    numberWord,
    handleWord,
    handleRemoveWord,
    sentence,
    showTranslation,
  } = props;
  const [rondomWords, setRondomWords] = useState();

  useEffect(() => {
    if (listSimilarWors) {
      const arr = listSimilarWors[numberWord]?.similarWords.concat({
        item: listSimilarWors[numberWord].word,
      });
      const randomSort = () => {
        return arr?.sort(() => Math.random() - 0.5);
      };
      setRondomWords(randomSort());
    }
  }, [listSimilarWors, numberWord]);
  return (
    <>
    {showTranslation && <p className='text-translate__our-game'>{sentence}</p>}
      <div className="select-word">
        {selectWord &&
          selectWord.map((item, index) => {
            return item.toLowerCase() === correctSentence[index] ? (
              <div key={`${item}1`}>
                <span key={`${item}2`}>{item.toLowerCase()}</span>
              </div>
            ) : (
              <div key={`${item}3`}>
                <span
                  key={`${item}4`}
                  className={resultRound ? 'error__select-word' : ''}
                >
                  {item.toLowerCase()}
                </span>
                <span
                  key={`${item}5`}
                  className={
                    resultRound
                      ? 'correct__word_visible'
                      : 'correct__word_hidden'
                  }
                >
                  {correctSentence[index]}
                </span>
              </div>
            );
          })}
        {(selectWord.length && !resultRound) && (
          <span
          key={Math.round(10000)}
            className="btn-remove__our-game"
            role="presentation"
            onClick={handleRemoveWord}
          >
            <i className="fas fa-backspace fa-2x" />
          </span>
        )}
      </div>
      <ul>
        {rondomWords &&
          !resultRound &&
          rondomWords.map((word, index) => {
            return (
              <li
                role="presentation"
                key={`${word.item + index}`}
                onClick={(e) => handleWord(e)}
              >
                {word.item.toLowerCase()}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ListWord;
