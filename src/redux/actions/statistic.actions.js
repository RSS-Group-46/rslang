  import * as types from '../../constants/actionTypeConstants';

export const saveStatistic = (statistic) => {
  return {
    type: types.SAVE_STATISTIC,
    payload: statistic
  }
}

export const loadStatistic = (statistic) => {
  return {
    type: types.LOAD_STATISTIC,
    payload: statistic
  }
}

export const deleteStatistic = (statistic) => {
  return {
    type: types.DELETE_STATISTIC,
    payload: statistic
  }
}