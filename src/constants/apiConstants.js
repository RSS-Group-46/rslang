// /words
export const TOTAL_GROUPS = 6;
export const PAGES_PER_GROUP = 30;
export const WORDS_PER_PAGE = 20;
// words difficulty
export const HARD = 'HARD';
export const EASY = 'EASY';

// api userAggregatedWords query filters
export const filterByDifficulty = (difficulty) => ({
  "$or": [{ "userWord.difficulty": difficulty }, { "userWord": null }]
});

export const excludeByDifficulty = (difficulty) => ({
  "$or": [{ "userWord.difficulty": { "$ne": difficulty } }, { "userWord": null }]
});

export const ONLY_USER_WORDS = { "userWord": { "$ne": null } }
export const EASY_WORDS = filterByDifficulty(EASY);
export const HARD_WORDS = filterByDifficulty(HARD);
export const NOT_EASY_WORDS = excludeByDifficulty(EASY);
export const NOT_HARD_WORDS = excludeByDifficulty(HARD);

// HTTP METHODS for the http hook, except methods absent in swagger
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
