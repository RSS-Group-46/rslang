import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeOption } from '../../../redux/actions/settings.actions';
import {
  selectShowTranslation,
  selectShowDescribe,
  selectShowExample
} from '../../../redux/selectors/settings.selectors';
import { SETTINGS_NAMES } from '../../../constants/settingsConstants';

const optionNames = [SETTINGS_NAMES.showTranslation, SETTINGS_NAMES.showDescribe, SETTINGS_NAMES.showExample];

const getRandomNameToChoose = (toExclude) => {
  const excludingIndex = optionNames.indexOf(toExclude);
  return [...optionNames.slice(0, excludingIndex), ...optionNames.slice(excludingIndex + 1)][0];
}

const CardInfoOptions = () => {
  const [lastClicked, setLastClicked] = useState(null);
  const showTranslation = useSelector(selectShowTranslation);
  const showDescribe = useSelector(selectShowDescribe);
  const showExample = useSelector(selectShowExample);
  const dispatch = useDispatch();

  const doChangeOption = (optionName, value) => {
    setLastClicked(optionName);
    dispatch(changeOption(optionName, value))
  };

  useEffect(() => {
    const anyChoosed = showTranslation || showDescribe || showExample;
    if (!anyChoosed && lastClicked) {
      doChangeOption(getRandomNameToChoose(lastClicked), true);
    }
  })

  return (
    <>
      <legend className="cards-settings__info">Information</legend>
      <small className="form-text text-muted">What information do you want to see on your cards?</small>
      <div className="form-group cards-settings__info">
        <div className="custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="translationButton"
            checked={showTranslation}
            onChange={() => doChangeOption(SETTINGS_NAMES.showTranslation, !showTranslation)}
          />
          <label htmlFor="translationButton" className="custom-control-label">
            Word translation
        </label>
        </div>
        <div className="custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="describeButton"
            checked={showDescribe}
            onChange={() => doChangeOption(SETTINGS_NAMES.showDescribe, !showDescribe)}
          />
          <label htmlFor="describeButton" className="custom-control-label">
            Describe the word
        </label>
        </div>
        <div className="custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="exampleButton"
            checked={showExample}
            onChange={() => doChangeOption(SETTINGS_NAMES.showExample, !showExample)}
          />
          <label htmlFor="exampleButton" className="custom-control-label">
            Example sentence
        </label>
        </div>
      </div>
    </>
  )
}

export default CardInfoOptions;