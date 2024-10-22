import React from 'react';
import { useHistory } from 'react-router-dom';
import imageError from '../../assets/images/error-boundary.png';
import { BASE_URL } from '../../constants/urlConstants';

import './ErrorIndicator.scss';

const ErrorIndicator = ({ handleCloseError }) => {
  const history = useHistory();

  const handleButton = () => {
    history.push(BASE_URL);
    handleCloseError();
  };

  return (
    <div className="Error">
      <img src={imageError} alt="error" />
      <span>Something went wrong !</span>
      <span>We are working on it!</span>
      <button type="button" onClick={handleButton}>
        Go Home
      </button>
    </div>
  );
};

export default ErrorIndicator;
