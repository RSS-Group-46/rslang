import React  from 'react';

const Word = (props) => {

function wordPlaceholder () {
    let word;
    if (props.wordObj) {
        word = props.wordObj.word;
    } else {
        word = '';
    }
    return word
    }
    return (
        <h4 className="card-title">
                <input type="text" className="maingame__pasteWord maingame__pasteWord_placeholder" placeholder={wordPlaceholder()} size={wordPlaceholder().length}/>
        </h4>
    );
  };
  
  export default Word;