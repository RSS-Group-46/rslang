import React from 'react';
import YouTube from 'react-youtube';

import './Promotion.scss';

const Promotion = () => {
  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const opts = {
    height: '400',
    width: '700',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="youtube  container">
      <h3>Please play the video to familiarize how to use RS Lang.</h3>
      <YouTube videoId="OfZDAh7zO7Y" opts={opts} onReady={onReady} />
    </div>
  );
};

export default Promotion;
