/* eslint-disable */
import React from 'react';

const Button = ({ value, number }) => {
  return (
    <button className={`btn btn-danger btn-${number}`} type="button">
      {number} - <span className={`btn-${number}__value`}>{value}</span>
    </button>
  );
};

export default Button;
