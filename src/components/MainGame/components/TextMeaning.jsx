import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowDescribe } from '../../../redux/selectors/settings.selectors';

let textClassName

const TextMeaning = (props) => {
    const showDescribe = useSelector(selectShowDescribe);
    if (showDescribe) {
        textClassName = 'card-text maingame__sentence';
      } else {
        textClassName = 'none';
      }
     const  isShowAnswear = false;

      function replaceString (word) {
          let tire = '';
          if (isShowAnswear) {
            tire = word
          } else {
              for (let i=0;i< word.length ; i +=1 ) {
                tire += "_";
              }
          }
          return tire;
      }

      function deleteTegs (string, seatchtSring, replaceWord){

        return string.replace(seatchtSring, replaceWord);

    }

    function textShow () {
        let word;
        let textMeaning;
        let seatchtSring;
        let textShowString;
        let replaceWord;

        if (props.wordObj) {
            textMeaning = props.wordObj.textMeaning;
            word = props.wordObj.word;
            seatchtSring = `/${word}/gi`;
            replaceWord = replaceString (word, isShowAnswear)
            textShowString = deleteTegs (textMeaning, seatchtSring, replaceWord)
           
        } else {
            textShowString = '';
        }
        return textShowString
    }
console.log(textShow ())
    return (
        <p  className={textClassName}>
            {textShow ()}
        </p>
    );
  };
  
  export default TextMeaning;