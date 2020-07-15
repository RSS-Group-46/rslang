import * as types from '../../constants/actionTypeConstants';
import { STATISTIC_INITIAL_STATE } from '../../constants/statisticConstants';

export default (state = STATISTIC_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_STATISTIC: {
      return {
        ...state,
        ...action.payload
      }
    }
    case types.LOAD_STATISTIC: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case types.DELETE_STATISTIC: {
      return {
        ...state,
        ...action.payload
      }
    }
    default: return state;
  }
}
