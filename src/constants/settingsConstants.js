export const WORDS_PER_DAY_DEFAULT_VALUE = 5;
export const SETTINGS_INITIAL_STATE = {
  wordsPerDay: WORDS_PER_DAY_DEFAULT_VALUE,
  difficulty: 0, // from 0 to 5 inclusive

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

export const DIFFICULTY_DESCRIPTIONS = {
  0: 'very easy',
  1: 'easy',
  2: 'normal',
  3: 'hard',
  4: 'very hard',
  5: 'expert',
};