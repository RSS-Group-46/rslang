import React from 'react';

const SpeakItError = ({ errorText }) => {
  return <span>{errorText.message}</span>;
};

export default SpeakItError;
