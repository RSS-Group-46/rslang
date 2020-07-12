import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowExample } from '../../../redux/selectors/settings.selectors';
import Word from './Word';

let textClassName

const TextExample = (props) => {
    const showExample = useSelector(selectShowExample);
    if (showExample) {
        textClassName = '';
      } else {
        textClassName = 'none';
      }

    function firstPartSentens (){
        let textMeaning;
        let textShowString
        if (props.wordObj) {
            textMeaning = props.wordObj.textExample;
            const [seatchtSring] =  textMeaning.split('<b>')
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
            textMeaning = props.wordObj.textExample;
            const [, seatchtSring] =  textMeaning.split('</b>')
            textShowString =  seatchtSring;
           
        } else {
            textShowString = '';
        }
        return textShowString;
    }

    return (
        <>
            <span className={textClassName}>{firstPartSentens ()}</span>
            <Word wordObj={props.wordObj} isShowAnswear={props.isShowAnswear}/>
            <span className={textClassName}>{secondPartSentens ()}</span>
        </>
    );
  };
  
  export default TextExample;