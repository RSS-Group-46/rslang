export const selectStatistic = (state) => state.statistic;
export const selectPassedCards = (state) => state.statistic.passedCards;
export const selectProcentCorrectAnswers = (state) => state.statistic.procentCorrectAnswers;
export const selectNewWords = (state) => state.statistic.newWords;
export const selectLongSeriesCorrectAnswers = (state) => state.statistic.longSeriesCorrectAnswers;
export const selectLearnedWords = (state) => state.statistic.learnedWords;