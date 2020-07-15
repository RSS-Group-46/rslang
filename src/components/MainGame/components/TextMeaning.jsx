import React from 'react';
import { useSelector } from 'react-redux';

import { selectShowDescribe } from '../../../redux/selectors/settings.selectors';
import WordReadonly from './WordReadonly';


const TextMeaning = ({wordObj, isShowAnswear}) => {
    const showDescribe = useSelector(selectShowDescribe);

function firstPartSentens (){
    let textMeaning;
    let textShowString
    const regexp = /<i>/i;
    if (wordObj) {
        textMeaning = wordObj.textMeaning;
        if (regexp.test(textMeaning)) {
            const [seatchtSring] =  textMeaning.split('<i>')
            textShowString =  seatchtSring;
        } 
    } 
    return textShowString;
}

function secondPartSentens (){
    let textMeaning;
    const regexp = /<\/i>/i;
    let textShowString
    if (wordObj) {
        textMeaning = wordObj.textMeaning;
        if (regexp.test(textMeaning)) {
            const [, seatchtSring] =  textMeaning.split('</i>')
            textShowString =  seatchtSring;
        }
    } 
    return textShowString;
}

    return (
        <p  className={showDescribe ? 'card-text maingame__sentence' : 'none'}>
            <span>{firstPartSentens ()}</span>
            <WordReadonly wordObj={wordObj} isShowAnswear={isShowAnswear}/>
            <span>{secondPartSentens ()}</span>
        </p>
    );
  };
  
  export default TextMeaning;
