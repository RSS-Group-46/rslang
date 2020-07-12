import { useCallback, useState, useEffect } from 'react';
import { USER_DATA_STORAGE_NAME } from '../constants/commonConstants';

const tokenTimeModificator = 1000;

const getIsTokenExpired = (token) => {
  const tokenObj = JSON.parse(atob(token.split('.')[1]));;
  return new Date() > new Date(tokenObj.exp * tokenTimeModificator);
}

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
    if (data && data.token) {
      if (getIsTokenExpired(data.token)) {
        logOut();
      } else {
        logIn(data.token, data.userId);
      }
    }
  }, [logIn]);

  return { logIn, logOut, token, userId };
};

export default useAuth;
