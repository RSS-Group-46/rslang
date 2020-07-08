import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowTranscription } from '../../../redux/selectors/settings.selectors';

let textClassName

const Transcription = (props) => {
    const showTranscription = useSelector(selectShowTranscription);
    if (showTranscription) {
        textClassName = 'card-text maingame__sentence';
      } else {
        textClassName = 'none';
      }

    function textShow () {
        let word;
        if (props.wordObj) {
            word = props.wordObj.transcription;
        } else {
            word = '';
        }
        return word
    }

    return (
        <p  className={textClassName}>
            {textShow ()}
        </p>
    );
  };
  
  export default Transcription;