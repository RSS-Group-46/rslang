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

  const getPlayData = (word, words) => {
    if (!word) return { word: null, wordTranslate: null, image: null}

    const correct = Math.random() >= 0.5;
    const { image } = word;
    let { wordTranslate } = word;

    if (!correct) {
      const currentExcluded = words.filter((w) => w.word !== word);
      wordTranslate = randomFromArray(currentExcluded).wordTranslate;
    }

    return { word: word.word, wordTranslate, image, correct };
  };

export {
  randomFromArray,
  getDataUrl,
  correctWordUrls,
  getPlayData,
};
