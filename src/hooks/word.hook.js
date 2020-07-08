import { useState } from 'react';
import useHttp from './http.hook';
import { METHODS } from "../constants/apiConstants";

const URL = 'https://afternoon-falls-25894.herokuapp.com/users/';

const useWord = () => {
  const [word, setWord] = useState({});
  const [error, setError] = useState(null);
  const { loading, request } = useHttp();

  const getUserWord = ({ userId, wordId }) => {
    const wordURL = `${URL}${userId}/words/${wordId}`;

    const fetchWord = async () => {
      try {
        const result = await request(wordURL);

        setWord(result);
      } catch (err) {
        setError(err.message || 'Error to get word from API');
      }
    };
    fetchWord();
  };

  // const createUserWord = ({ userId, wordId, word }) => {
  //   const getDataUrl = (item) => `https://raw.githubusercontent.com/shevv920/rslang-data/master/${item}`;
  //
  //   const fetchWord = async () => {
  //     try {
  //       const result = await request(getDataUrl);
  //
  //       createUserWord(result);
  //     } catch (err) {
  //       setError(err.message || 'Error to get word from API');
  //     }
  //   };
  //   fetchWord();
  // };

  const deleteUserWord = ({ userId, wordId }) => {
    const deleteURL = `${URL}${userId}/words/${wordId}`;

    const deleteWord = async () => {
      try {
        const result = await request(deleteURL, METHODS.DELETE);
        console.log(result);
        return true;
      } catch (err) {
        setError(err.message || 'Error to delete word from API');
        return false;
      }
    };
    deleteWord();
  };

  return { word, getUserWord, deleteUserWord, loading, error };
}

export default useWord;
