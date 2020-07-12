import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowExample } from '../../../redux/selectors/settings.selectors';

let textClassName

const TextExampleTranslate = (props) => {
    const showExample = useSelector(selectShowExample);
    if (showExample) {
        textClassName = 'card-text maingame__sentence';
      } else {
        textClassName = 'none';
      }

    function textExampleShow () {
        let word;
        if (props.wordObj) {
            word = props.wordObj.textExampleTranslate;
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
  
  export default TextExampleTranslate;