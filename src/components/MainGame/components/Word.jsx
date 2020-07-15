
import React, {useRef, useEffect, useState}  from 'react';

const Word = ({wordObj, isShowAnswear, setUserWord, retfocus, wordImput  }) => {

    const [word, setWord] = useState('')

    useEffect (()=>{
        if(wordObj){
            setWord(wordObj.word)
        }
    }, [wordObj]);

    const focusRef = useRef();
    function returnfocus () {
        focusRef.current.focus();
    }

    useEffect(() => {
        returnfocus ()
      }, [retfocus]);

    return (
            <input type="text" 
                className="maingame__pasteWord maingame__pasteWord_placeholder" 
                placeholder={isShowAnswear ? word : ''} 
                size={word ? word.length : 1}
                onChange={(e) => setUserWord(e.target.value)} 
                value={wordImput}
                ref={focusRef}
            />
    );
  };
  
  export default Word;