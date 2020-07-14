import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowDescribe } from '../../../redux/selectors/settings.selectors';
import WordReadonly from './WordReadonly';

let textClassName

const TextMeaning = (props) => {
    const showDescribe = useSelector(selectShowDescribe);
    if (showDescribe) {
        textClassName = 'card-text maingame__sentence';
      } else {
        textClassName = 'none';
      }

function firstPartSentens (){
    let textMeaning;
    let textShowString
    const regexp = /<i>/i;
    if (props.wordObj) {
        textMeaning = props.wordObj.textMeaning;
        if (regexp.test(textMeaning)) {
            const [seatchtSring] =  textMeaning.split('<i>')
            textShowString =  seatchtSring;
        } else {
        textShowString =  '';
        }
    } else {
        textShowString = '';
    }
    return textShowString;
}

function secondPartSentens (){
    let textMeaning;
    const regexp = /<\/i>/i;
    let textShowString
    if (props.wordObj) {
        textMeaning = props.wordObj.textMeaning;
        if (regexp.test(textMeaning)) {
            const [, seatchtSring] =  textMeaning.split('</i>')
            textShowString =  seatchtSring;
        }else {
            textShowString =  '';
            }
    } else {
        textShowString = '';
    }
    return textShowString;
}

    return (
        <p  className={textClassName}>
            <span>{firstPartSentens ()}</span>
            <WordReadonly wordObj={props.wordObj} isShowAnswear={props.isShowAnswear}/>
            <span>{secondPartSentens ()}</span>
        </p>
    );
  };
  
  export default TextMeaning;
