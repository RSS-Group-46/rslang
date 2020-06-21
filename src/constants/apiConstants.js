// /words
export const TOTAL_GROUPS = 6;
export const PAGES_PER_GROUP = 30;
export const WORDS_PER_PAGE = 20;

// api userAggregatedWords query filters
export const filterByDifficulty = (difficulty) => ({
  "$or": [{ "userWord.difficulty": difficulty }, { "userWord": null }]
});

export const excludeByDifficulty = (difficulty) => ({
  "$or": [{ "userWord.difficulty": { "$ne": difficulty } }, { "userWord": null }]
});

export const ONLY_USER_WORDS = { "userWord": { "$ne": null } }
export const EASY_WORDS = filterByDifficulty('easy');
export const HARD_WORDS = filterByDifficulty('hard');
export const NOT_EASY_WORDS = excludeByDifficulty('easy');
export const NOT_HARD_WORDS = excludeByDifficulty('hard');