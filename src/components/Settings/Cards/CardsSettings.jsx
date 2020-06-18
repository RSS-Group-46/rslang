import React from 'react';
import CardInfoOptions from './CardInfoOptions';
import CardAdditionalOptions from './CardAdditionalOptions';
import CardWordOperationOptions from './CardWordOperationOptions';

const CardsSettings = () => {
  return (
    <div className="cards-settings">
      <h3>This is an options for <strong>Cards</strong></h3>
      <hr />
      <CardInfoOptions />
      <CardAdditionalOptions />
      <CardWordOperationOptions />
    </div>
  )
}

export default CardsSettings;