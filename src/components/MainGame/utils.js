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

export {
  randomFromArray,
  getDataUrl,
  correctWordUrls,
  getPlayData,
};
