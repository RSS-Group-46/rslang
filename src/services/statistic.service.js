const prepareStatisticForServer = (statistic) => {
  const { learnedWords, ...optional } = statistic;
  return JSON.stringify({
    learnedWords,
    optional
  });
}

export const prepareStatisticForApp = (statistic) => {
  const { learnedWords, optional } = statistic;
  return { learnedWords, ...optional };
}

export const pushUserStatistic = (statistic, userData) => {

  const normalizedSettings = prepareStatisticForServer(statistic);
  const { userId, token } = userData;
  console.log('body', normalizedSettings)
  fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      body: normalizedSettings,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    })
}

export const pullUserStatistic = async (userData) => {
  const { userId, token } = userData;
  const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    }
  );
  if (response.ok) {
    return response.json();
  }
  return null; 
} 