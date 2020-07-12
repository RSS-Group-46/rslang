import { combineReducers } from 'redux';
import settings from './settings.reducer';
import statistic from './statistic.reducer';

export default combineReducers({
  settings, statistic,
});
