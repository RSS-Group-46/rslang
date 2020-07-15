import React, {useState, useEffect}  from 'react';
import { useSelector } from 'react-redux';

import { selectShowTranslation } from '../../../redux/selectors/settings.selectors';

const WordTranslate = ({wordObj}) => {
    const showExample = useSelector(selectShowTranslation);

    const [wordTranslation, setWordTranslation] = useState('')

    useEffect (()=>{
        if(wordObj){
            setWordTranslation(wordObj.translation)
        }
    }, [wordObj]);

    return (
        <p  className={showExample ? "text-info maingame__translation" : "none"}>
            {wordTranslation}
        </p>
    );
  };
  
  export default WordTranslate;