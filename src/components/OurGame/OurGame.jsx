import React, { useEffect } from 'react';
// import { API_SIMILAR_WORDS } from './constants';

const OurGame = (props) => {
  const { sentence } = props;
  console.log(sentence);
  
  useEffect(() => {
    const arrWords = sentence[0].textExample.split(' ');
    async function getPartSpeech () {
      const promises = arrWords.map((item) => {
        fetch(
          `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${item}`,
        )
        .then((response) => response.json())
        .then((data) => console.log(data[0]))
      })
      await Promise.all(promises)
    }
    getPartSpeech();
    console.log('done');
  },[])
  return(
    <div className='our-game'>
      hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
    </div>
  );
}

export default OurGame;