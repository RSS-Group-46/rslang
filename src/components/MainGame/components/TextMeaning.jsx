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

     function replaceString (word) {
        let tire = '';
        if (props.isShowAnswear) {
          tire = word
        } else {
            for (let i=0;i< word.length ; i +=1 ) {
              tire += "_";
            }
        }
        return tire;
    }


function firstPartSentens (){
    let textMeaning;
    let textShowString
    if (props.wordObj) {
        textMeaning = props.wordObj.textMeaning;
        const [seatchtSring] =  textMeaning.split('<i>')
        textShowString =  seatchtSring;
    } else {
        textShowString = '';
    }
    return textShowString;
}

function secondPartSentens (){
    let textMeaning;
   
    let textShowString
    if (props.wordObj) {
        textMeaning = props.wordObj.textMeaning;
        const [, seatchtSring] =  textMeaning.split('</i>')
        textShowString =  seatchtSring;
       
    } else {
        textShowString = '';
    }
    return textShowString;
}


     function wordShow () {
        let textMeaning;
        let textShowString
        if (props.wordObj) {
            textMeaning = props.wordObj.word;
            textShowString =  replaceString (textMeaning);
           
        } else {
            textShowString = '';
        }
        return textShowString;
     }

    return (
        <p  className={textClassName}>
            <span>{firstPartSentens ()}</span>
            <span className="maingame__pasteWord">{wordShow ()}</span>
            <span>{secondPartSentens ()}</span>
        </p>
    );
  };
  
  export default TextMeaning;