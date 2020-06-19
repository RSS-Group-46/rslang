export const WORDS_PER_DAY_DEFAULT_VALUE = 5;
export const SETTINGS_INITIAL_STATE = {
  wordsPerDay: WORDS_PER_DAY_DEFAULT_VALUE,

  // info on cards (at least one must be choosed)
  showTranslation: true,
  showDescribe: false,
  showExample: false,

  // additional info
  showTranscription: false,
  showAssociationPicture: false,

  // buttons
  showAnswerButton: false,
  showDeleteButton: false,
  showMoveToComplicatedButton: false,

  volume: 0.5, // some stuff like mini-games have sounds, should not be at 100% volume I guess
};