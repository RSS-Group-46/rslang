import * as types from '../../constants/actionTypeConstants';
import { WORDS_PER_DAY_DEFAULT_VALUE } from '../../components/Settings/Settings';

const initialState = {
  wordsPerDay: WORDS_PER_DAY_DEFAULT_VALUE,
  cards: {
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
  },

  volume: 0.5, // some stuff like mini-games have sounds, should not be at 100% volume I guess
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_CARD_OPTION: {
      const { optionName, value } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [optionName]: value,
        }
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
