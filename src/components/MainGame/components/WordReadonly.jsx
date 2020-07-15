import React, { useState, useEffect } from 'react';

const WordReadonly = ({ wordObj, isShowAnswear }) => {
  const [word, setWord] = useState(' ');

  useEffect(() => {
    if (wordObj) {
      setWord(wordObj.word);
    }
  }, [wordObj]);

  return (
    <>
      <input
        type="text"
        readOnly="readOnly"
        className="maingame__pasteWord maingame__pasteWord_textMeaning"
        placeholder={isShowAnswear ? word : '.................................'}
        size={word ? word.length : 1}
      />
    </>
  );
};

export default WordReadonly;
