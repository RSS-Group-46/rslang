const prepareStatisticWithHoisting = (statistic) => {
  const { learnedWords, ...optional } = statistic;
  return JSON.stringify({
    learnedWords,
    optional
  });
}

const prepareStatisticWithoutHoisting = (statistic) => {
  const { learnedWords, optional } = statistic;
  return JSON.stringify({
    learnedWords,
    optional
  });
}

export const prepareStatisticForApp = (statistic) => {
  const { learnedWords, optional } = statistic;
  return { learnedWords, ...optional };
}

export const pushUserStatistic = (statistic, userData, doHoist = true) => {
  const normalizedStatistics = doHoist ? prepareStatisticWithHoisting(statistic) : prepareStatisticWithoutHoisting(statistic);
  const { userId, token } = userData;
  fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      body: normalizedStatistics,
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

const mergeMiniGamesStatistics = (statistics, gameName, newStatisticsEntity, newLearnedWords) => {
  if (statistics) {
    statistics.learnedWords += newLearnedWords;
    const { optional } = statistics;
    const { miniGames } = optional;
    if (miniGames) {
      const currentGameStatistics = miniGames[gameName] || [];
      currentGameStatistics.push(newStatisticsEntity);
      miniGames[gameName] = currentGameStatistics;
    } else {
      optional.miniGames = {};
      optional.miniGames[gameName] = [newStatisticsEntity];
    }
    return statistics;
  }

  const newStatistics = {
    learnedWords: newLearnedWords,
    optional: { miniGames: {} }
  }
  newStatistics.optional.miniGames[gameName] = [newStatisticsEntity];
  return newStatistics;
}

export const pushMiniGamesRoundStatistics = async (gameName, newStatisticsEntity, newLearnedWords, userData) => {
  const statistics = await pullUserStatistic(userData);
  const merged = mergeMiniGamesStatistics(statistics, gameName, newStatisticsEntity, newLearnedWords);
  pushUserStatistic(merged, userData, false);
}