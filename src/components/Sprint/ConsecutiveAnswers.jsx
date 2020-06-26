/* eslint-disable react/no-array-index-key */
import React from 'react';

import starWin from '../../assets/icons/star-win.svg';
import star from '../../assets/icons/star.svg';

export default ({ total, current }) => {
  const totalWinStars = Math.min(current, total);
  const totalEmptyStars = total - totalWinStars;


  return (
    <div className="game__stars">
      {Array(totalWinStars)
        .fill(starWin)
        .map((src, i) => <img src={src} key={`star-win-${i}`} alt="star" />)}
      {Array(totalEmptyStars)
        .fill(star)
        .map((src, i) => <img src={src} key={`star-win-${i}`} alt="star" />)}
    </div>
  );
};