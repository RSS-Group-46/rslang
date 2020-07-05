import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVolume, selectDifficulty } from '../../../redux/selectors/settings.selectors';
import { changeOption } from '../../../redux/actions/settings.actions';
import { DIFFICULTY_DESCRIPTIONS } from '../../../constants/settingsConstants';

const difficultyToString = (n) => `${DIFFICULTY_DESCRIPTIONS[n]} (${n})`;

export default () => {
  const volume = useSelector(selectVolume);
  const difficulty = useSelector(selectDifficulty);
  const dispatch = useDispatch();
  const changeVolume = (e) => dispatch(changeOption('volume', e.target.value));
  const changeDifficulty = (e) => dispatch(changeOption('difficulty', e.target.value));

  return (
    <div className="form-group">
      <label htmlFor="volumeRange"><h5>{`Volume: ${volume * 100}%`}</h5></label>
      <input
        type="range"
        className="custom-range"
        id="volume"
        min="0.1"
        max="1"
        step="0.1"
        value={volume}
        onChange={changeVolume} />
      <label htmlFor="difficultyRange"><h5>{`Difficulty: ${difficultyToString(difficulty)}`}</h5></label>
      <input
        type="range"
        className="custom-range"
        id="difficulty"
        min="0"
        max="5"
        step="1"
        value={difficulty}
        onChange={changeDifficulty} />
    </div>
  );
};
