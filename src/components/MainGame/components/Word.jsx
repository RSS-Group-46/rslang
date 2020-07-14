import React from 'react';

const Word = props => {
  function wordPlaceholder() {
    let word;
    if (props.wordObj) {
      word = props.wordObj.word;
    } else {
      word = '';
    }
    return word;
  }
  function ShowWordPlaceholder() {
    let show;
    if (!props.isShowAnswear) {
      show = '';
    } else {
      show = wordPlaceholder();
    }
    return show;
  }
  return (
    <input
      type="text"
      className="maingame__pasteWord maingame__pasteWord_placeholder"
      placeholder={ShowWordPlaceholder()}
      size={wordPlaceholder().length}
    />
  );
};

export default Word;
