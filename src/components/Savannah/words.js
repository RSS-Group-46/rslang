import Queue from '../../utils/Queue';

const getWords = async () => {
  const words = new Queue([]);
  const translatedWords = new Queue([]);
  try {
    const response = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/words?page=${Math.round(
        Math.random() * 29,
      )}&group=${Math.round(Math.random() * 5)}`,
    );

    const data = await response.json();

    data.forEach((el) => {
      words.add(el.word);
      translatedWords.add(el.wordTranslate);
    });
  } catch (e) {
    // TODO: add toast notification
  }

  return { words, translatedWords };
};

export default getWords;
