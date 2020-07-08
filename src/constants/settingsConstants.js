export const WORDS_PER_DAY_DEFAULT_VALUE = 5;

export const SETTINGS_NAMES = {
  wordsPerDay: 'wordsPerDay',
  difficulty: 'difficulty',
  soundsAutoPlay: 'soundsAutoPlay',

  showTranslation: 'showTranslation',
  showDescribe: 'showDescribe',
  showExample: 'showExample',

  showTranscription: 'showTranscription',
  showAssociationPicture: 'showAssociationPicture',

  showAnswerButton: 'showAnswerButton',
  showDeleteButton: 'showDeleteButton',
  showMoveToComplicatedButton: 'showMoveToComplicatedButton',

  volume: 'volume',
};

Object.freeze(SETTINGS_NAMES); // prevent mutation

export const SETTINGS_INITIAL_STATE = {
  [SETTINGS_NAMES.wordsPerDay]: WORDS_PER_DAY_DEFAULT_VALUE,
  [SETTINGS_NAMES.difficulty]: 0, // from 0 to 5 inclusive
  [SETTINGS_NAMES.soundsAutoPlay]: true,

  // info on cards (at least one must be choosed)
  [SETTINGS_NAMES.showTranslation]: true,
  [SETTINGS_NAMES.showDescribe]: false,
  [SETTINGS_NAMES.showExample]: false,

  // additional info
  [SETTINGS_NAMES.showTranscription]: false,
  [SETTINGS_NAMES.showAssociationPicture]: false,

  // buttons
  [SETTINGS_NAMES.showAnswerButton]: false,
  [SETTINGS_NAMES.showDeleteButton]: false,
  [SETTINGS_NAMES.showMoveToComplicatedButton]: false,

  [SETTINGS_NAMES.volume]: 0.5, // some stuff like mini-games have sounds, should not be at 100% volume I guess
};

export const DIFFICULTY_DESCRIPTIONS = {
  0: 'very easy',
  1: 'easy',
  2: 'normal',
  3: 'hard',
  4: 'very hard',
  5: 'expert',
};