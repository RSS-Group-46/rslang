import React from 'react';

import './Loader.scss';

const Loader = () => {
  return (
    <div className='lds-ellipsis'>
      <div className='lds-ellipsis__list'>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
