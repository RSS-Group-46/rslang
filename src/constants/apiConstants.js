// /words
export const TOTAL_GROUPS = 6;
export const PAGES_PER_GROUP = 30;
export const WORDS_PER_PAGE = 20;

export const DIFFICULTIES = {
  HARD: 'HARD',
  EASY: 'EASY',
};

// api userAggregatedWords query filters
export const filterByDifficulty = (difficulty) => ({
  "$or": [{ "userWord.difficulty": difficulty }, { "userWord": null }]
});

export const excludeByDifficulty = (difficulty) => ({
  "$or": [{ "userWord.difficulty": { "$ne": difficulty } }, { "userWord": null }]
});

export const ONLY_USER_WORDS = { "userWord": { "$ne": null } }
export const EASY_WORDS = filterByDifficulty(DIFFICULTIES.EASY);
export const HARD_WORDS = filterByDifficulty(DIFFICULTIES.HARD);
export const NOT_EASY_WORDS = excludeByDifficulty(DIFFICULTIES.EASY);
export const NOT_HARD_WORDS = excludeByDifficulty(DIFFICULTIES.HARD);

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};
