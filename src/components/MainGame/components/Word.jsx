
import React, {useRef, useEffect}  from 'react';

const Word = (props) => {


function wordPlaceholder () {
    let word;
    if (props.wordObj.word) {
        word = props.wordObj.word;
    } else {
        word = '';
    }
    return word
    }

    function ShowWordPlaceholder () {
        let show
        if (!props.isShowAnswear) {
            show = '';
        } else {
            show =  wordPlaceholder ();
        }
        return show;
    }
    

    const { setUserWord } = props;

    const focusRef = useRef();
  
    function returnfocus () {
        focusRef.current.focus();
    }
    const {retfocus }= props;

    useEffect(() => {
        returnfocus ()
      }, [retfocus]);

    

    return (
        <>
            <input type="text" 
                className="maingame__pasteWord maingame__pasteWord_placeholder" 
                placeholder={ShowWordPlaceholder ()} 
                size={wordPlaceholder().length}
                onChange={(e) => setUserWord(e.target.value)} 
                value={props.wordImput}
                ref={focusRef}
            />
        </>
    );
  };
  
  export default Word;