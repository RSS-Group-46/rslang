import { useState, useEffect } from 'react';
import useAuth from './auth.hook';
import useHttp from './http.hook';


const useUserAggregatedWords = (params) => {
  const { userId, token } = useAuth();
  const { group, wordsPerPage, filter, onlyUserWords } = params;
  const [groupState] = useState(group);
  const [wordsPerPageState] = useState(wordsPerPage);
  const [filterState] = useState(filter);
  const [onlyUserWordsState] = useState(onlyUserWords);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { loading, request } = useHttp();

  const filterEncoded = encodeURIComponent(JSON.stringify(filterState));
  const paramsStr = `group=${groupState}&wordsPerPage=${wordsPerPageState}&filter=${filterEncoded}&onlyUserWords=${onlyUserWordsState}`;
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?${paramsStr}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await request(url, 'GET', null, headers);
        setData(res);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error get words from API');
      }
    };

    fetchWords();
  }, [url, headers, request]);


  return { loading, data, error };
};

export default useUserAggregatedWords;