import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCardOption } from '../../../redux/actions/settings.actions';

const showTranscriptionOptionName = 'showTranscription';
const showAssociationPictureOptionName = 'showAssociationPicture';

const CardAdditionalOptions = () => {
  const showTranscription = useSelector((state) => state.settings.cards.showTranscription);
  const showAssociationPicture = useSelector((state) => state.settings.cards.showAssociationPicture);

  const dispatch = useDispatch();

  const doChangeOption = (optionName, value) => dispatch(changeCardOption(optionName, value));

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
            onChange={() => doChangeOption(showTranscriptionOptionName, !showTranscription)}
          />
          <label className="custom-control-label" htmlFor="transcriptionCheck">Show me the <strong>Transcription</strong></label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="associationCheck"
            checked={showAssociationPicture}
            onChange={() => doChangeOption(showAssociationPictureOptionName, !showAssociationPicture)}
          />
          <label className="custom-control-label" htmlFor="associationCheck">How about <strong>Association picture</strong>?</label>
        </div>
      </div>
    </>
  )
}

export default CardAdditionalOptions;