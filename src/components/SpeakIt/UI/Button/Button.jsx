import React from 'react';

import './Button.scss';

const Button = (props) => {
  return (
    <button
      className={`${props.classes} button`}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
