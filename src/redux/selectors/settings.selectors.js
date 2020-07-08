import { SETTINGS_NAMES } from '../../constants/settingsConstants';

export const selectSettings = (state) => state.settings;
export const selectShowTranscription = (state) => state.settings[SETTINGS_NAMES.showTranscription];
export const selectShowAssociationPicture = (state) => state.settings[SETTINGS_NAMES.showAssociationPicture];
export const selectShowTranslation = (state) => state.settings[SETTINGS_NAMES.showTranslation];
export const selectShowDescribe = (state) => state.settings[SETTINGS_NAMES.showDescribe];
export const selectShowExample = (state) => state.settings[SETTINGS_NAMES.showExample];
export const selectShowAnswerButton = (state) => state.settings[SETTINGS_NAMES.showAnswerButton];
export const selectShowDeleteButton = (state) => state.settings[SETTINGS_NAMES.showDeleteButton];
export const selectShowMoveToComplicatedButton = (state) => state.settings[SETTINGS_NAMES.showMoveToComplicatedButton];
export const selectVolume = (state) => state.settings[SETTINGS_NAMES.volume];
export const selectDifficulty = (state) => state.settings[SETTINGS_NAMES.difficulty];
export const selectSoundsAutoPlay = (state) => state.settings[SETTINGS_NAMES.soundsAutoPlay];
