import { useCallback, useState, useEffect } from 'react';
import { USER_DATA_STORAGE_NAME } from '../constants/commonConstants';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const logIn = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      USER_DATA_STORAGE_NAME,
      JSON.stringify({ userId: id, token: jwtToken }),
    );
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(USER_DATA_STORAGE_NAME);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_NAME));
    if (data && data.token && data.userId) {
      logIn(data.token, data.userId);
    }
  }, [logIn]);

  return { logIn, logOut, token, userId };
};

export default useAuth;
