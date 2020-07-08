import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowExample } from '../../../redux/selectors/settings.selectors';

let textClassName

const TextExample = (props) => {
    const showExample = useSelector(selectShowExample);
    if (showExample) {
        textClassName = 'card-title';
      } else {
        textClassName = 'none';
      }

    function textExampleShow () {
        let word;
        if (props.wordObj) {
            word = props.wordObj.textExample;
        } else {
            word = '';
        }
        return word
    }

    return (
        <h4  className={textClassName}>
            {textExampleShow ()}
        </h4>
    );
  };
  
  export default TextExample;