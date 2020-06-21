// /words
export const TOTAL_GROUPS = 6;
export const PAGES_PER_GROUP = 30;
export const WORDS_PER_PAGE = 20;

// api userAggregatedWords query filters
export const filterByDifficulty = (difficulty) => ({
  "userWord.difficulty": difficulty
});

export const excludeByDifficulty = (difficulty) => ({
  "userWord.difficulty": { $ne: difficulty }
});

export const easyWords = filterByDifficulty('easy');
export const hardWords = filterByDifficulty('hard');
export const notEasyWords = excludeByDifficulty('easy');
export const notHardWords = excludeByDifficulty('hard');