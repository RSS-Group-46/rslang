import React, { useEffect, useRef } from 'react';

function Notification({ title, message, delay }) {
  const toastRef = useRef();

  useEffect(() => {
    if (delay instanceof Number) {
      setTimeout(() => toastRef.current && toastRef.current.remove(), delay);
    }
  }, [delay]);

  function handleClick() {
    if (toastRef.current) {
      toastRef.current.remove();
    }
  }

  return (
    <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" ref={toastRef}>
      <div className="toast-header">
        <strong className="mr-auto">{title}</strong>
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={handleClick}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
}

export default Notification;
