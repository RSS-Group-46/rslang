import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeOption } from '../../../redux/actions/settings.actions';

const showTranscriptionOptionName = 'showTranslation';
const showDescribeOptionName = 'showDescribe';
const showExampleOptionName = 'showExample';

const CardInfoOptions = () => {
  const showTranslation = useSelector((state) => state.settings.showTranslation);
  const showDescribe = useSelector((state) => state.settings.showDescribe);
  const showExample = useSelector((state) => state.settings.showExample);

  const dispatch = useDispatch();

  const doChangeOption = (optionName, value) => dispatch(changeOption(optionName, value));

  useEffect(() => {
    const anyChoosed = showTranslation || showDescribe || showExample;
    if (!anyChoosed) {
      doChangeOption(showTranscriptionOptionName, true);
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
            onChange={() => doChangeOption(showTranscriptionOptionName, !showTranslation)}
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
            onChange={() => doChangeOption(showDescribeOptionName, !showDescribe)}
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
            onChange={() => doChangeOption(showExampleOptionName, !showExample)}
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