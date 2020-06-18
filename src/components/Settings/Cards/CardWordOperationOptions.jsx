import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeOption } from '../../../redux/actions/settings.actions';

const showAnswerButtonOptionName = 'showAnswerButton';
const showDeleteButtonOptionName = 'showDeleteButton';
const showMoveToComplicatedOptionName = 'showMoveToComplicatedButton';

const CardWordOperationOptions = () => {
  const showAnswerButton = useSelector((state) => state.settings.showAnswerButton);
  const showDeleteButton = useSelector((state) => state.settings.showDeleteButton);
  const showMoveToComplicatedButton = useSelector((state) => state.settings.showMoveToComplicatedButton);

  const dispatch = useDispatch();

  const doChangeOption = (optionName, value) => dispatch(changeOption(optionName, value));

  return (
    <>
      <legend className="cards-settings__other">Some helpfull buttons</legend>
      <small className="form-text text-muted">Hit on it whenewer you want!</small>
      <div className="form-group cards-settings__another-buttons">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="answerCheck"
            checked={showAnswerButton}
            onChange={() => doChangeOption(showAnswerButtonOptionName, !showAnswerButton)}
          />
          <label className="custom-control-label" htmlFor="answerCheck">Reveal the <strong>answer</strong></label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="deleteCheck"
            checked={showDeleteButton}
            onChange={() => doChangeOption(showDeleteButtonOptionName, !showDeleteButton)}
          />
          <label className="custom-control-label" htmlFor="deleteCheck"><strong>Delete</strong> this word</label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="complicatedCheck"
            checked={showMoveToComplicatedButton}
            onChange={() => doChangeOption(showMoveToComplicatedOptionName, !showMoveToComplicatedButton)}
          />
          <label className="custom-control-label" htmlFor="complicatedCheck">Move to <strong>Complicated</strong></label>
        </div>
      </div>
    </>
  )
}

export default CardWordOperationOptions;