/* eslint consistent-return: 0 */
/* eslint no-unused-vars: 0 */

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
          Authorization: `Bearer ${token}`
        };
        const result = await request(wordURL, METHODS.GET, null, headers);
      } catch (err) {
        setError(err.message || 'Error to get word from API');
      }
    };
    getWord();
  };

  const getUserWords = ({ userId, token }) => {
    const userWordsURL = `${URL}${userId}/words`;

    const getWords = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        };
        const result = await request(userWordsURL, METHODS.GET, null, headers);
      } catch (err) {
        setError(err.message || 'Error to delete word from API');
      }
    };
    getWords();
  };

  const createUserWord = ({ userId, wordId, token, word }) => {
    const createWordUrl = `${URL}${userId}/words/${wordId}`;

    const createWord = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        };
        const result = await request(createWordUrl, METHODS.POST, word, headers );
      } catch (err) {
        setError(err.message || 'Error to get word from API');
      }
    };
    createWord();
  };

  const deleteUserWord = ({ userId, wordId, token }) => {
    const deleteURL = `${URL}${userId}/words/${wordId}`;

    const deleteWord = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`
        };
        const result = await request(deleteURL, METHODS.DELETE, null, headers);
      } catch (err) {
        setError(err.message || 'Error to delete word from API');
      }
    };
    deleteWord();
  };

  const updateUserWord = ({ userId, wordId, token, word }) => {
    const updateURL = `${URL}${userId}/words/${wordId}`;

    const updateWord = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const result = await request(updateURL, METHODS.PUT, word, headers);
      } catch (err) {
        setError(err.message || 'Error to update word from API');
      }
    };
    updateWord();
  };

  return { getUserWord, getUserWords, deleteUserWord, createUserWord, updateUserWord, loading, error };
}

export default useWord;
