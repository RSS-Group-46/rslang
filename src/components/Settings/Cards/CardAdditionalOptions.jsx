import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeOption } from '../../../redux/actions/settings.actions';
import { selectShowTranscription, selectShowAssociationPicture } from '../../../redux/selectors/settings.selectors';
import { SETTINGS_NAMES } from '../../../constants/settingsConstants';


const CardAdditionalOptions = () => {
  const showTranscription = useSelector(selectShowTranscription);
  const showAssociationPicture = useSelector(selectShowAssociationPicture);
  const dispatch = useDispatch();

  const doChangeOption = (optionName, value) => dispatch(changeOption(optionName, value));

  return (
    <>
      <legend className="cards-settings__other">Other</legend>
      <small className="form-text text-muted">How else we can improve your expirience?</small>
      <div className="form-group cards-settings__other">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="transcriptionCheck"
            checked={showTranscription}
            onChange={() => doChangeOption(SETTINGS_NAMES.showTranscription, !showTranscription)}
          />
          <label className="custom-control-label" htmlFor="transcriptionCheck">Show me the <strong>Transcription</strong></label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="associationCheck"
            checked={showAssociationPicture}
            onChange={() => doChangeOption(SETTINGS_NAMES.showAssociationPicture, !showAssociationPicture)}
          />
          <label className="custom-control-label" htmlFor="associationCheck">How about <strong>Association picture</strong>?</label>
        </div>
      </div>
    </>
  )
}

export default CardAdditionalOptions;