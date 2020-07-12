
const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getDataUrl = (item) => `https://raw.githubusercontent.com/shevv920/rslang-data/master/${item}`;
const correctWordUrls = (obj) => (
  {
    ...obj,
    image: getDataUrl(obj.image),
    audio: getDataUrl(obj.audio),
    audioMeaning: getDataUrl(obj.audioMeaning),
    audioExample: getDataUrl(obj.audioExample),
  });
   
const getPlayData = (word) => {
  if (!word) {
    return { _id: null,
    group: 0,
    page: 0,
    word: null,
    image: null,
    audio: null,
    audioMeaning: null,
    audioExample: null,
    textMeaning: null,
    textExample: null,
    transcription: null,
    textExampleTranslate: null,
    textMeaningTranslate: null,
    wordTranslate: null,
    wordsPerExampleSentence: 0 };
  }

  return word;
};


function goAudio(wordObj,showExample,showDescribe, isAudioPlay, setAudioPlau ) {
  const audioarr=[];

    if (wordObj.audioExample && !showExample && !showDescribe ){
      audioarr.push(new Audio(getDataUrl(wordObj.audio)));
    }

    if (wordObj.audioExample && showExample  ){
      audioarr.push(new Audio(getDataUrl(wordObj.audioExample)));
    }

    if (wordObj.audioMeaning && showDescribe ){
      audioarr.push(new Audio(getDataUrl(wordObj.audioMeaning)));
   
    }
    
    function playNextAudio() {
      if (audioarr[1] && isAudioPlay){
        audioarr[1].play()

      audioarr[1].addEventListener('ended', ()=>{
        setAudioPlau(audioarr[1].ended)
      });
      }
      }

      
      for(let i=0;i<audioarr.length;i+=1){
      if (audioarr[0] && isAudioPlay){
        audioarr[0].play()
      }
      audioarr[0].addEventListener('ended', () => playNextAudio());
      }
        

}

export {
  randomFromArray,
  getDataUrl,
  correctWordUrls,
  getPlayData,
  goAudio,
};
