import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowDescribe } from '../../../redux/selectors/settings.selectors';

let textClassName

const TextMeaningTranslate = (props) => {
    const showExample = useSelector(selectShowDescribe);
    if (showExample) {
        textClassName = 'card-text maingame__sentence';
      } else {
        textClassName = 'none';
      }

    function textExampleShow () {
        let word;
        if (props.wordObj) {
            word = props.wordObj.textMeaningTranslate;
        } else {
            word = '';
        }
        return word
    }

    return (
        <p  className={textClassName}>
            {textExampleShow ()}
        </p>
    );
  };
  
  export default TextMeaningTranslate;