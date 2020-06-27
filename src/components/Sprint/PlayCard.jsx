/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectShowAssociationPicture,
  selectShowTranscription,
  selectShowAnswerButton,
  selectShowDeleteButton,
  selectShowMoveToComplicatedButton,
} from '../../redux/selectors/settings.selectors';

export default ({ playData, wordsLoading, handleAnswer }) => {
  const showAssociationPicture = useSelector(selectShowAssociationPicture);
  const showWordTranscription = useSelector(selectShowTranscription);
  const showAnswerButton = useSelector(selectShowAnswerButton);
  const showDeleteButton = useSelector(selectShowDeleteButton);
  const showMoveToComplicatedButton = useSelector(selectShowMoveToComplicatedButton);

  return (
    <div className="game__main card card-sprint border-primary mb-3">
      {showAssociationPicture &&
        <img className="card-img-top word-image" src={playData.image} alt={playData.word} />}
      <div className="card-body">
        {playData.raw &&
          <div className="card-title d-flex justify-content-between">
            <h4>{playData.word}</h4>
            {showWordTranscription &&
              <h3>{playData.raw.transcription}</h3>}
          </div>}
        <h4 className="card-subtitle text-muted">{playData.wordTranslate}</h4>
      </div>
      <div className="card-footer">
        <div className="d-flex flex-row justify-content-between">
          <button className="btn btn-danger" type="button" onClick={() => handleAnswer(false)}>Не верно</button>
          <button className="btn btn-success" type="button" onClick={() => handleAnswer(true)}>Верно</button>
        </div>
      </div>
      {(showMoveToComplicatedButton || showAnswerButton || showDeleteButton) &&
        <div className="card-footer">
          <div className="d-flex flex-row justify-content-between">
            {showMoveToComplicatedButton &&
              <button className="btn btn-warning" type="submit">Move to complicated</button>}
            {showAnswerButton &&
              <button className="btn btn-info" type="submit">Reveal answer</button>}
            {showDeleteButton &&
              <button className="btn btn-danger" type="submit">Delete word</button>}
          </div>
        </div>}
      {wordsLoading && <div className="card-img-overlay loader p-0">
        <h1>loading</h1>
      </div>}
    </div>
  );
};
