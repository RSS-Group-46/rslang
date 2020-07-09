import { useState } from 'react';
import useHttp from './http.hook';
import { METHODS } from "../constants/apiConstants";

const URL = 'https://afternoon-falls-25894.herokuapp.com/users/';

const useWord = () => {
  const [error, setError] = useState(null);
  const { loading, request } = useHttp();

  const getUserWord = ({ userId, wordId, token }) => {
    const wordURL = `${URL}${userId}/words/${wordId}`;

    const getWord = async () => {
      try {
        const headers = {
          "Authorization": `Bearer ${token}`
        };
        const result = await request(wordURL, METHODS.GET, null, headers);
        return result;
      } catch (err) {
        setError(err.message || 'Error to get word from API');
        return false;
      }
    };
    getWord();
  };

  const getUserWords = ({ userId, token }) => {
    const userWordsURL = `${URL}${userId}/words`;

    const getWords = async () => {
      try {
        const headers = {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        };
        const result = await request(userWordsURL, METHODS.GET, null, headers);
        return result;
      } catch (err) {
        setError(err.message || 'Error to delete word from API');
        return false;
      }
    };
    getWords();
  };

  const createUserWord = ({ userId, wordId, token, word }) => {
    const createWordUrl = `${URL}${userId}/words/${wordId}`;

    const createWord = async () => {
      try {
        const body = JSON.stringify(word);
        const headers = {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        };
        const result = await request(createWordUrl, METHODS.POST, body, headers );
        return result;
      } catch (err) {
        setError(err.message || 'Error to get word from API');
        return false;
      }
    };
    createWord();
  };

  const deleteUserWord = ({ userId, wordId, token }) => {
    const deleteURL = `${URL}${userId}/words/${wordId}`;

    const deleteWord = async () => {
      try {
        const headers = {
          "Authorization": `Bearer ${token}`
        };
        const result = await request(deleteURL, METHODS.DELETE, null, headers);
        return result;
      } catch (err) {
        setError(err.message || 'Error to delete word from API');
        return false;
      }
    };
    deleteWord();
  };

  return { getUserWord, getUserWords, deleteUserWord, createUserWord, loading, error };
}

export default useWord;
