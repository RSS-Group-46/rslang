import React, { useState, useEffect } from 'react';

import './Countdown.scss';

const Countdown = ({ duration, startImmediately, onTimeout }) => {
  const [current, setCurrent] = useState(duration);
  const [isActive, setIsActive] = useState(startImmediately);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setCurrent(cur => {
          if (cur <= 0) {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
          return cur - 1;
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [current, isActive]);

  useEffect(() => {
    if(current <= 0) {
      onTimeout();
    }
  }, [current, onTimeout])

  return (
    <div className="countdown m-1">
      <div className="countdown__visual">
        {isActive &&
          <svg>
            <circle
              r="24"
              cx="26"
              cy="26"
              style={{
                animation: `countdown-animation ${duration}s linear`,
              }}
            />
          </svg>
        }
      </div>
      <span className="countdown__text">{current}</span>
    </div>
  );
}

export default Countdown;