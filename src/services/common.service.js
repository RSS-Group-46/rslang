import { METHODS } from '../constants/apiConstants';

export const getUserAggregateWords = async (userData, group, wordsPerPage) => {
  const { userId, token } = userData;
  const paramsStr = `group=${group}&wordsPerPage=${wordsPerPage}`;
  const response = await fetch(`https://pacific-castle-12388.herokuapp.com/users/${userId}/aggregatedWords?${paramsStr}`,
    {
      method: METHODS.GET,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    }
  );
  if (response.ok) {
    return response.json();
  }
  return [];
}

export const getWords = async (group, page, wordsPerPage) => {
  const response = await fetch(`https://pacific-castle-12388.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${wordsPerPage}`,
    {
      method: METHODS.GET,
      headers: { 'Accept': 'application/json', }
    }
  );
  if (response.ok) {
    return response.json();
  }
  return [];
}