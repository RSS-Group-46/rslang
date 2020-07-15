import React, {useState, useEffect}  from 'react';
import { useSelector } from 'react-redux';

import { selectShowTranscription } from '../../../redux/selectors/settings.selectors';

const Transcription = ({wordObj}) => {
    const showTranscription = useSelector(selectShowTranscription);

    const [wordTranscription, setWordTranscription] = useState('')

    useEffect (()=>{
        if(wordObj){
            setWordTranscription(wordObj.transcription)
        }
    }, [wordObj]);

    return (
        <p  className={showTranscription ? 'card-text maingame__sentence' : 'none'}>
            {wordTranscription}
        </p>
    );
  };
  
  export default Transcription;