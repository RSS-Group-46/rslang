import React, {useState, useEffect}   from 'react';
import { useSelector } from 'react-redux';
import { selectShowExample } from '../../../redux/selectors/settings.selectors';


const TextExampleTranslate = ({wordObj}) => {
    const showExample = useSelector(selectShowExample);

    const [textExampleTranslate, setWordTranscription] = useState('')

    useEffect (()=>{
        if(wordObj){
            setWordTranscription(wordObj.textExampleTranslate)
        }
    }, [wordObj]);

    return (
        <p  className={showExample ? 'card-text maingame__sentence' : 'none'}>
            {textExampleTranslate}
        </p>
    );
  };
  
  export default TextExampleTranslate;