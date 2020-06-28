import React, { useContext } from 'react';
import Modal from 'react-modal';
import { BackgroundContext } from './Puzzle';

const ResultsModal = (props) => {
  const { modalIsOpen, closeModal, iKnow, iDontKnow } = props;
  const { url, pictureName } = useContext(BackgroundContext);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Your results"
    >
      <div class="modal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Your results</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div style={{ backgroundImage: url }}></div>
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ReactModal;