import { useState, useEffect } from 'react';

const RESIZE_EVENT_NAME = 'resize';

const getDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getDimensions());

  useEffect(() => {
    function resize() {
      setWindowDimensions(getDimensions());
    }

    window.addEventListener(RESIZE_EVENT_NAME, resize);
    return () => window.removeEventListener(RESIZE_EVENT_NAME, resize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;