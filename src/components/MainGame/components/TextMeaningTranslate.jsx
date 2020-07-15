import React, {useState, useEffect}  from 'react';
import { useSelector } from 'react-redux';
import { selectShowDescribe } from '../../../redux/selectors/settings.selectors';

const TextMeaningTranslate = ({wordObj}) => {
    const showExample = useSelector(selectShowDescribe);
    const [textMeaningTranslate, setTextMeaningTranslate] = useState('')

    useEffect (()=>{
        if(wordObj){
            setTextMeaningTranslate(wordObj.textMeaningTranslate)
        }
    }, [wordObj]);

    return (
        <p  className={showExample ? 'card-text maingame__sentence' : 'none' }>
            {textMeaningTranslate}
        </p>
    );
  };
  
  export default TextMeaningTranslate;