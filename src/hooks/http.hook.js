import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);

      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-type'] = 'application/json';
        }

        const RESPONSE = await fetch(url, { method, body, headers });
        const DATA = await RESPONSE.json();

        if (!RESPONSE.ok) {
          throw new Error(DATA.message || 'Something went wrong');
        }

        setLoading(false);

        return DATA;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};

export default useHttp;
