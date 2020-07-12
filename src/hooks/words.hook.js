import { useState, useEffect } from 'react';
import useHttp from './http.hook';
import WordsIterator from '../utils/WordsIterator';
import { TOTAL_GROUPS, PAGES_PER_GROUP, WORDS_PER_PAGE } from '../constants/apiConstants';

const wordsIterator = new WordsIterator(TOTAL_GROUPS, PAGES_PER_GROUP, WORDS_PER_PAGE);
export const getDataUrl = (item) => `https://raw.githubusercontent.com/shevv920/rslang-data/master/${item}`;

const useWords = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [group, setGroup] = useState(0);
  const [error, setError] = useState(null);
  const [curWordIndex, setCurWordIndex] = useState(0);
  const { loading: wordsLoading, request } = useHttp();

  const wordsURL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;

  const nextWords = () => {
    const nextData = wordsIterator.getNext();
    setCurWordIndex(nextData.word);
    setPage(nextData.page);
    setGroup(nextData.group);
  };

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await request(wordsURL);
        const withUrlsCorrected = res.map((obj) => (
          {
            ...obj,
            image: getDataUrl(obj.image),
            audio: getDataUrl(obj.audio),
            audioMeaning: getDataUrl(obj.audioMeaning),
            audioExample: getDataUrl(obj.audioExample),
          }));

        setData(withUrlsCorrected);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error get words from API');
      }
    };
    fetchWords();
  }, [request, wordsURL]);


  return { words: data, wordsLoading, word: data[curWordIndex], nextWords, error };
}

export default useWords;
