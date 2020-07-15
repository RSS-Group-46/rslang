import * as types from '../../constants/actionTypeConstants';

export const changeOption = (optionName, value) => {
  return {
    type: types.CHANGE_OPTION,
    payload: { optionName, value },
  };
};

export const changeWordsPerDayAmount = (amount) => {
  return {
    type: types.CHANGE_WORDS_PER_DAY_OPTION,
    payload: amount,
  };
};

export const changeOptions = (settings) => {
  return {
    type: types.CHANGE_OPTIONS,
    payload: settings,
  };
};
