import * as types from '../../constants/actionTypeConstants';
import { SETTINGS_INITIAL_STATE } from '../../constants/settingsConstants';

export default (state = SETTINGS_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_OPTION: {
      const { optionName, value } = action.payload;
      return {
        ...state,
        [optionName]: value,
      }
    }
    case types.CHANGE_OPTIONS: {
      return {
        ...state,
        ...action.payload
      }
    }
    case types.CHANGE_WORDS_PER_DAY_OPTION: {
      return {
        ...state,
        wordsPerDay: action.payload,
      }
    }
    default: return state;
  }
}
