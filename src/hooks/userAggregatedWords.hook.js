import { useState, useEffect } from 'react';
import useHttp from './http.hook';

/**
 * 
 * @param { userId } authorized user id
 * @param { token } logged in user token  
 * @param { group } words group from 0 to 5 inclusive
 * @param { wordsPerPage } aggregated result pagination, how many words per page
 * @param { filter } filter - object corresponding MongoDB document queries
 * @param { onlyUserWords } select only user words flag
 */
const useUserAggregatedWords = (params) => {
  const { userId, token, group, wordsPerPage, filter, onlyUserWords } = params;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { loading, request } = useHttp();

  const filterEncoded = encodeURIComponent(JSON.stringify(filter));
  const paramsStr = `group=${group}&wordsPerPage=${wordsPerPage}&filter=${filterEncoded}&onlyUserWords=${onlyUserWords}`;
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?${paramsStr}`;

  useEffect(() => {
    const fetchWords = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
      if (token) {
        try {
          const res = await request(url, 'GET', null, headers);
          setData(res);
          setError(null);
        } catch (err) {
          setError(err.message || 'Failed to fetch aggregated words from API');
        }
      } else {
        setError('Error: Unauthorized');
      }
    }

    fetchWords();
  }, [url, token, request]);


  return { loading, data, error };
};

export default useUserAggregatedWords;