import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import OurGame from './OurGame';

import './OurGame.scss';

const StartPageOurGame = () => {
  const [loader, setLoader] = useState(false);
  const [start, setStart] = useState(false);
  const [sentence, setSentences] = useState(null);

  const handleBtnStartOurGame = () => setStart(true);
  useEffect(() => {
    if (start) {
      setLoader(true);
      fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=1&group=1`)
        .then((response) => response.json())
        .then((data) => {
          setLoader(false);
          setSentences(data);
        });
    }
  }, [start]);

  return (
    <div className="wrapper__our-game">
      {loader && <Loader />}
       {!sentence ? <div className='wrapper__button-start'>
        <h2>Collect the sentence.</h2>
        <button
          type="button"
          className="btn btn-info"
          onClick={handleBtnStartOurGame}
        >
          Start
        </button>
      </div> : 
      <OurGame sentence={sentence}/>}
    </div>
  );
};

export default StartPageOurGame;
