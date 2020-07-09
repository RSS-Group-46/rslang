import React from 'react';
import SpeakItTrainBlock from '../SpeakItTrainBlock/SpeakItTrainBlock';

import './SpeakItTrainLevel.scss';

const levels = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

let currentTrainLevel = 1;

const SpeakItTrainLevel = () => {
  const handleCheck = (event) => {
    const clickedElement = event.target;

    if (currentTrainLevel !== event.target.id) {
      const trainLevelElements = [
        ...document.querySelectorAll('.train-levels__level'),
      ];
      trainLevelElements.forEach((el) =>
        el.classList.remove('train-levels__level--active')
      );
  
      clickedElement.classList.add('train-levels__level--active');
  
      currentTrainLevel = event.target.id;
    }
  };

  const createItem = () => {
    return levels.map((item, index) => {
      return (
        <li
          key={item.id}
          onClick={handleCheck}
          role="presentation"
          className={`${
            index === 0
              ? 'train-levels__level train-levels__level--active'
              : 'train-levels__level'
          }`}
          id={item.id}
        />
      );
    });
  };

  return (
    <div className="train-page  container">
      <ul className="train-levels">{createItem()}</ul>
      <SpeakItTrainBlock />
    </div>
  );
};

export default SpeakItTrainLevel;
