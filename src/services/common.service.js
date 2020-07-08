import { METHODS } from '../constants/apiConstants';

const getWords = async (group, page, wordsPerPage) => {
  const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${wordsPerPage}`,
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

export default getWords;