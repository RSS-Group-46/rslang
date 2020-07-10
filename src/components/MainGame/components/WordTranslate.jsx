import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowTranslation } from '../../../redux/selectors/settings.selectors';

let textClassName

const WordTranslate = (props) => {
    const showExample = useSelector(selectShowTranslation);
    if (showExample) {
        textClassName = 'text-info maingame__translation';
      } else {
        textClassName = 'none';
      }

    function textExampleShow () {
        let word;
        if (props.wordObj) {
            word = props.wordObj.wordTranslate ;
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
  
  export default WordTranslate;