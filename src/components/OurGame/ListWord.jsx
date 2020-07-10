import React, { useEffect, useState } from 'react';

const ListWord = (props) => {
  const {listSimilarWors, correctSentence, resultRound, selectWord, numberWord, handleWord } = props;
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
      <div className="select-word">
        {selectWord &&
          selectWord.map((item, index) => {
            return item.toLowerCase() === correctSentence[index] ? (
              <div>
                <span key={item}>{item.toLowerCase()}</span>
              </div>
            ) : (
              <div>
                <span
                  key={item}
                  className={resultRound && 'error__select-word'}
                >
                  {item.toLowerCase()}
                </span>
                <span
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
      </div>
      <ul>
        {(rondomWords && !resultRound) &&
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
