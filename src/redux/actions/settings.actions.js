import * as types from '../../constants/actionTypeConstants';

export const changeCardOption = (optionName, value) => {
  return {
    type: types.CHANGE_CARD_OPTION,
    payload: { optionName, value },
  }
}

export const changeWordsPerDayAmount = (amount) => {
  return {
    type: types.CHANGE_WORDS_PER_DAY_OPTION,
    payload: amount,
  }
}