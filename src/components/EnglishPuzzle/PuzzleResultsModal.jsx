import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import BackgroundContext from '../../contexts/puzzleBackground.context';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const PuzzleResultsModal = (props) => {
  const { modalIsOpen, closeModal, doContinue, results } = props;
  const background = useContext(BackgroundContext);
  const { guessed, unguessed } = results;
  if (!background) {
    return null;
  }
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Your results"
    >
      <div className="modal-header">
        <h5 className="modal-title">Your results</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal} />
      </div>
      <div className="modal-body">
        <div className="puzzle-results-modal__picture-container">
          <div className="puzzle-results-modal__picture" style={{ backgroundImage: `url('${background.url}')` }} />
          <p className="puzzle-results-modal__picture-name">{background.pictureName}</p>
        </div>
        <h4>I don&apos;t know: <span className="badge badge-pill badge-danger">{unguessed.length}</span></h4>
        {unguessed.map((s) => <p>{s}</p>)}
        <h4>I know: <span className="badge badge-pill badge-success">{guessed.length}</span></h4>
        {guessed.map((s) => <p>{s}</p>)}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={doContinue}>Continue</button>
      </div>
    </ReactModal>
  )
}

export default PuzzleResultsModal;